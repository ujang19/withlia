/**
 * inject-lynk.js
 * Kirim 3 payload ke endpoint webhook (tanpa signature).
 * Node 18+ (punya fetch & crypto).
 */

const ENDPOINT_URL = "https://wzhjkaqdvahstnqjqmqu.supabase.co/functions/v1/bright-endpoint"; // <-- ganti ke endpoint webhook kamu

// ==== Konstanta produk ====
const PRODUCT = {
  title: "7 DAYS TO BECOME A SMART MARKETER by WithLia",
  uuid: "67cd46b3a69ca55551ace094-6462-9951672502-1741506227677",
  price: 225000,
  stock: 48,
  qty: 1,
};

const CREATED_AT = "2025-07-10T16:29:57";

// === Utility ===
function makeRefId() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 32);
}

function makeMessageId() {
  const base = Math.floor(Date.now() / 1000);
  const rand = Math.random().toString(36).slice(-6);
  return `API_CALL_${base}_${rand}`;
}

// === Builder payload ===
function buildPayload({ name, email, phone, refId, message_id }) {
  return {
    event: "payment.received",
    data: {
      message_action: "SUCCESS",
      message_code: "0",
      message_data: {
        createdAt: CREATED_AT,
        customer: { email, name, phone },
        items: [
          {
            addons: [],
            appointment_data: {},
            pafId: "",
            price: PRODUCT.price,
            public_affiliate_content: {},
            qty: PRODUCT.qty,
            stock: PRODUCT.stock,
            title: PRODUCT.title,
            uuid: PRODUCT.uuid,
          },
        ],
        refId,
        shippingAddress: "",
        shippingInfo: "",
        totals: {
          affiliate: 0,
          convenienceFee: 0,
          customerPay: 0,
          discount: -PRODUCT.price,
          grandTotal: 0,
          totalAddon: 0,
          totalItem: 1,
          totalPrice: PRODUCT.price,
          totalShipping: 0,
        },
      },
      message_desc: "",
      message_id,
      message_title: "",
    },
  };
}

// === Payloads ===

// 1) Sample ujangg
const payloadUjangg = buildPayload({
  name: "ujangg",
  email: "ujangaab1908@gmail.com",
  phone: "085723651569",
  refId: "4865efe68eb1106a5e3b47d4b435403b",
  message_id: "API_CALL_175213980116301_7226874",
});

// 2) Pandu Adhi
const payloadPandu = buildPayload({
  name: "Pandu Adhi",
  email: "panduadhi@5758creativelab.com",
  phone: "082111636340",
  refId: makeRefId(),
  message_id: makeMessageId(),
});

// 3) Yuniar Indah Syah Putri
const payloadYuniar = buildPayload({
  name: "Yuniar Indah Syah Putri",
  email: "yuniar@gmail.com",
  phone: "081802994996",
  refId: makeRefId(),
  message_id: makeMessageId(),
});

// === Kirim Payload ===
async function sendOne(label, payload) {
  console.log(`\n==> Inject: ${label}`);
  try {
    const res = await fetch(ENDPOINT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await res.text().catch(() => "");
    console.log("Status:", res.status);
    if (text) {
      try {
        console.log("Response JSON:", JSON.parse(text));
      } catch {
        console.log("Response Text:", text);
      }
    } else {
      console.log("No response body.");
    }
  } catch (e) {
    console.error("Error:", e);
  }
}

// === Main ===
(async function main() {
  await sendOne("Sample: Ujangg", payloadUjangg);
  await sendOne("Pandu Adhi", payloadPandu);
  await sendOne("Yuniar Indah Syah Putri", payloadYuniar);
})();
