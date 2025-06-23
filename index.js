const { create } = require('@open-wa/wa-automate');

create({
  useChrome: true,
  headless: false,         // show browser for QR scan
  qrTimeout: 0,            // no timeout for QR scan
  authTimeout: 0,          // no auth timeout
  multiDevice: true,       // enable for MD support
  cacheEnabled: false
}).then(async (client) => {
  console.log("✅ WhatsApp is ready. Please scan the QR code if needed.");

  // Log incoming group messages with group ID
  client.onMessage(async (message) => {
    if (message.isGroupMsg) {
      console.log("📨 Message from group:");
      console.log("🧾 Group Name:", message.chat.name);
      console.log("🆔 Group ID:", message.chatId);
    }
  });

  // List all group chats you belong to
  const allChats = await client.getAllChats();
  const groups = allChats.filter(chat => chat.isGroup);

  if (groups.length === 0) {
    console.log("❌ You are not in any WhatsApp groups.");
  } else {
    console.log("📋 Your WhatsApp Groups:");
    groups.forEach(group => {
      console.log(`📌 ${group.name} — ${group.id._serialized}`);
    });
  }

  // Send a message to a specific group
  const groupId = '1203630xxxxxxxx@g.us'; // Replace with your group ID
  try {
    await client.sendText(groupId, '👋 Hello group! This is an automated message from David.');
    console.log("✅ Message sent successfully.");
  } catch (err) {
    console.error("❌ Failed to send message:", err.message);
  }
});
