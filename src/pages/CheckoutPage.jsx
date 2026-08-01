import { useState, useEffect } from "react"; // Added useEffect
import { ArrowLeft } from "lucide-react";
import CheckoutForm from "../components/CheckoutForm";
import OrderTrackingPanel from "../components/OrderTrackingPanel";
import OrderSummary from "../components/OrderSummary";
import { supabase } from "../supabaseClient";

const WHATSAPP_PHONE_NUMBER = "923187999004";

function normalizePhoneNumber(value) {
  return String(value || "").replace(/\D/g, "");
}

function getOrderErrorMessage(error) {
  if (!error) return "Unable to place order right now.";
  const parts = [error.message, error.details, error.hint].filter(Boolean);
  return parts.length > 0
    ? parts.join(" ")
    : "Unable to place order right now.";
}

function prepareWhatsappWindow() {
  const popup = window.open("", "_blank");
  if (!popup) return null;
  popup.document.write(`
    <!doctype html>
    <html>
      <head><title>Opening WhatsApp</title><meta charset="utf-8" /></head>
      <body style="font-family: Arial, sans-serif; padding: 24px; color: #2f241f;">
        <p style="margin: 0; font-size: 16px;">Opening WhatsApp...</p>
      </body>
    </html>
  `);
  popup.document.close();
  return popup;
}

function CheckoutPage({
  cartItems,
  onBackHome,
  onClearCart,
  onUpdateQuantity,
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderFeedback, setOrderFeedback] = useState("");
  const [trackingPhoneNumber, setTrackingPhoneNumber] = useState("");
  const [trackingRefreshKey, setTrackingRefreshKey] = useState(0);
  const [hasPlacedOrder, setHasPlacedOrder] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // --- NEW: Load from local storage on refresh ---
  useEffect(() => {
    const savedPhone = localStorage.getItem("lastOrderPhone");
    if (savedPhone) {
      setTrackingPhoneNumber(savedPhone);
      setHasPlacedOrder(true);
    }
  }, []);

  const handlePlaceOrder = async (formData) => {
    if (cartItems.length === 0) return false;

    const normalizedPhoneNumber = normalizePhoneNumber(formData.phoneNumber);

    setIsProcessing(true);
    setOrderFeedback("");
    setWhatsappUrl("");

    const orderPayload = {
      customer_name: formData.fullName,
      phone_number: normalizedPhoneNumber,
      address: formData.shippingAddress,
      city: formData.city,
      payment_method: formData.paymentMethod,
      items: cartItems,
      total_price: totalPrice,
    };

    const { data, error } = await supabase
      .from("orders")
      .insert([orderPayload])
      .select();

    setIsProcessing(false);

    if (error) {
      setHasPlacedOrder(false);
      setOrderFeedback(getOrderErrorMessage(error));
      return false;
    }

    const createdOrder = data?.[0] || null;
    const createdOrderId = createdOrder?.id || null;

    // 1. Prepare the Message
    const itemsSummary = cartItems
      .map((item) => `${item.name} x${item.quantity}`)
      .join(", ");

    const whatsappMessage = encodeURIComponent(
      `🛍️ New Order Received!\nOrder ID: ${createdOrderId}\nName: ${formData.fullName}\nItems: ${itemsSummary}\nTotal: ${totalPrice}\nAddress: ${formData.shippingAddress}, ${formData.city}`,
    );

    // 2. Build the URL
    const nextWhatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE_NUMBER}&text=${whatsappMessage}`;
    setWhatsappUrl(nextWhatsappUrl);

    // --- NEW: Save phone to local storage ---
    localStorage.setItem("lastOrderPhone", normalizedPhoneNumber);

    // 3. THE DIRECT JUMP
    window.location.href = nextWhatsappUrl;

    // 4. Update UI
    setTrackingPhoneNumber(normalizedPhoneNumber);
    setTrackingRefreshKey((currentValue) => currentValue + 1);
    setHasPlacedOrder(true);
    onClearCart();
    setOrderFeedback(
      `Thank you! Your order has been placed. Order ID: ${createdOrderId}.`,
    );

    return true;
  };

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={onBackHome}
          className="cursor-pointer  mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-ink)] transition hover:border-[var(--color-accent)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </button>

        <div className="mb-8 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-muted)]">
            Checkout
          </p>
          <h1 className="mt-3 font-brand text-5xl text-[var(--color-ink)] sm:text-6xl">
            Complete your order
          </h1>
          <p className="mt-4 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
            Fill in your delivery details below and review your selected pieces
            before placing the order.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <CheckoutForm
            disabled={cartItems.length === 0}
            isProcessing={isProcessing}
            onPlaceOrder={handlePlaceOrder}
            orderFeedback={orderFeedback}
            whatsappUrl={whatsappUrl}
          />
          <OrderSummary
            cartItems={cartItems}
            onUpdateQuantity={onUpdateQuantity}
          />
        </div>

        {hasPlacedOrder && (
          <div className="mt-6">
            <OrderTrackingPanel
              initialPhoneNumber={trackingPhoneNumber}
              refreshKey={trackingRefreshKey}
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default CheckoutPage;
