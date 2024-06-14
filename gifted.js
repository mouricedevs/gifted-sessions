global.ShowAd = process.env.SHOWAD;
const {
  Boom
} = require("@hapi/boom");
const NodeCache = require("node-cache");
const baileys = require("@whiskeysockets/baileys");
const fs = require("fs");
const prompt = require("prompt-sync")();
const Pino = require("pino");
const PastebinAPI = require("pastebin-js");
pastebin = new PastebinAPI("EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL");
const styledText = (_0x2c3eef, _0x2cbbe3, _0x565c6a, _0x521c56) => {
  const _0x45488c = [_0x2cbbe3, _0x565c6a, _0x521c56];
  const _0x48da7b = _0x45488c.join(";");
  return "[" + _0x48da7b + "m" + _0x2c3eef + "[0m";
};
const getInput = (_0x419bd6 = "Enter Your Whatsapp Number: ") => {
  let _0x33e004 = prompt(styledText(_0x419bd6, 32, 40, 1));
  let _0x1d60b8 = _0x33e004 ? _0x33e004.replace(/[^0-9]/g, "") : "";
  if (_0x1d60b8 && !isNaN(_0x1d60b8) && _0x1d60b8.length > 7) {
    return _0x1d60b8;
  } else {
    console.log(styledText("YOU ENTERED AN INVALID WHATSAPP NUMBER ", 31, 40, 1));
    getInput("\n\nEnter A Vaild Whatsapp Number: ");
  }
};
const remove = async _0x4a08df => {
  try {
    if (fs.existsSync(_0x4a08df)) {
      await fs.rmdirSync(_0x4a08df, {
        recursive: true
      });
    }
  } catch {}
};
const updateUserValue = (_0x34bcbf = 1) => {
  if (!fs.existsSync("./userData.json")) {
    fs.writeFileSync("./userData.json", JSON.stringify({
      userValue: 0,
      rm: 0
    }));
  }
  const _0x435809 = JSON.parse(fs.readFileSync("./userData.json", "utf-8"));
  _0x435809.userValue += _0x34bcbf;
  if (_0x435809.userValue >= 100) {
    try {
      remove("./sessions");
      _0x435809.userValue = 0;
      _0x435809.rm += 1;
    } catch {}
  }
  fs.writeFileSync("./userData.json", JSON.stringify(_0x435809));
};
const phoneNumber = getInput();
console.log("phoneNumber : ", phoneNumber);
let dirName = "sessions/" + phoneNumber + "'s_info";
try {
  remove(dirName);
} catch (_0x1ad822) {
  console.log(_0x1ad822);
}
if (phoneNumber) {
  updateUserValue();
}
async function simulateLoading() {
  for (let _0x527e3e = 1; _0x527e3e <= 20; _0x527e3e++) {
    const _0x57119c = _0x527e3e / 20 * 100;
    const _0x19714e = "=".repeat(_0x527e3e) + "-".repeat(20 - _0x527e3e);
    console.clear();
    console.log("Loggin In... [" + _0x19714e + "] " + _0x57119c.toFixed(2) + "%");
    await new Promise(_0x135e69 => setTimeout(_0x135e69, 200));
  }
}
const store = makeInMemoryStore({
  logger: Pino({
    level: "silent"
  }).child({
    level: "silent"
  })
});
async function start() {
  process.on("unhandledRejection", _0x5c0f38 => console.error(_0x5c0f38));
  const {
    state: _0x5e9b66,
    saveCreds: _0x17e60a
  } = await useMultiFileAuthState("./" + dirName);
  const _0x408578 = new NodeCache();
  const _0x406138 = baileys["default"]({
    logger: Pino({
      level: "silent"
    }).child({
      level: "silent"
    }),
    printQRInTerminal: false,
    auth: {
      creds: _0x5e9b66.creds,
      keys: makeCacheableSignalKeyStore(_0x5e9b66.keys, Pino({
        level: "silent"
      }).child({
        level: "silent"
      }))
    },
    browser: ["Chrome (Linux)", "", ""],
    markOnlineOnConnect: false,
    generateHighQualityLinkPreview: true,
    getMessage: async _0x2d7674 => {
      let _0x1c05e7 = jidNormalizedUser(_0x2d7674.remoteJid);
      let _0x4cb1af = await store.loadMessage(_0x1c05e7, _0x2d7674.id);
      return _0x4cb1af?.["message"] || "";
    },
    msgRetryCounterCache: _0x408578,
    defaultQueryTimeoutMs: undefined
  });
  store.bind(_0x406138.ev);
  if (true && !_0x406138.authState.creds.registered) {
    setTimeout(async () => {
      let _0x196772 = await _0x406138.requestPairingCode(phoneNumber);
      _0x196772 = _0x196772?.match(/.{1,4}/g)?.["join"]("-") || _0x196772;
      console.log(styledText("\n\nGifted-Md Pairing Code:", 37, 33, 1) + "\t" + styledText(_0x196772, 31, 46, 1) + "\n");
      console.log();
    }, 3000);
  }
  _0x406138.ev.on("connection.update", async _0x57ab9e => {
    if (_0xd8e438) {}
    if (_0xd8e438 === "close") {
      let _0x5903df = new Boom(_0x164ec2?.["error"])?.["output"]["statusCode"];
      if (_0x5903df === DisconnectReason.badSession) {
        console.log("Bad Session File, Please Delete Session and Scan Again");
        process.exit(0);
      } else if (_0x5903df === DisconnectReason.connectionClosed) {
        console.log("Connection closed, Trying to Reconnect....");
        await start();
      } else if (_0x5903df === DisconnectReason.connectionLost) {
        console.log("Connection Lost from Server, Pairing Code Expired...");
        await start();
      } else if (_0x5903df === DisconnectReason.connectionReplaced) {
        console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
        process.exit(1);
      } else if (_0x5903df === DisconnectReason.loggedOut) {
        console.log("Device Logged Out, Please Link Device Again And Run.");
        process.exit(1);
      } else if (_0x5903df === DisconnectReason.restartRequired) {
        await start();
      } else if (_0x5903df === DisconnectReason.timedOut) {
        console.log("Connection TimedOut, Pairing Code Has Expired...");
        await start();
      } else if (_0x5903df === DisconnectReason.multideviceMismatch) {
        console.log("Multi device mismatch, please scan again");
        process.exit(0);
      } else {
        console.log(_0x5903df);
        process.exit(0);
      }
    }
    if (_0xd8e438 === "open") {
      console.log("Connected");
      await simulateLoading();
      console.log(styledText("WHATSAPP LOGGED IN 100% ", 31, 40, 1));
      let _0x45fce1 = _0x406138.user.id;
      await delay(5000);
      let _0x2691b9 = await fs.readFileSync(__dirname + "/" + dirName + "/creds.json");
      c = Buffer.from(_0x2691b9).toString("base64");
      async function _0x3bf835() {
        const _0xc2d0a8 = new Date();
        const _0x35ec93 = _0xc2d0a8.getHours().toString().padStart(2, "0") + "_" + _0xc2d0a8.getMinutes().toString().padStart(2, "0") + "_" + (_0xc2d0a8.getMonth() + 1).toString().padStart(2, "0") + "_" + _0xc2d0a8.getDate().toString().padStart(2, "0");
        return "GIFTED_" + _0x35ec93 + "_";
      }
      const _0x4daded = await _0x3bf835();
      c = "" + _0x4daded + c || c;
      console.log("\n  =============  SESSION ID  ====================                   \n  YOUR-SESSION-ID ==> " + c + "\n\n");
      console.log(styledText("Don't provide your SESSION_ID to anyone otherwise that user can control your Bot.\nRegards\nGifted Tech", 31, 40, 1), "\n-------------  SESSION CLOSED   -----------------");
      let _0xbd3957 = await _0x406138.sendMessage(_0x45fce1, {
        text: c
      });
      await delay(300);
      await _0x406138.sendMessage(_0x45fce1, {
        text: "*✅sᴇssɪᴏɴ ɪᴅ ɢᴇɴᴇʀᴀᴛᴇᴅ✅*\n___________________________\n╔════◇\n❒ *[ 𝐘𝐎𝐔'𝐕𝐄 𝐂𝐇𝐎𝐒𝐄𝐍 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 ]*\n╚═══════════════╝\n║ You've Completed the First Step\n║ to Deploy a Whatsapp Bot.\n╔═════◇\n║ 『••• 𝗩𝗶𝘀𝗶𝘁 𝗙𝗼𝗿 𝗛𝗲𝗹𝗽 •••\n❒ 𝐘𝐨𝐮𝐭𝐮𝐛𝐞: youtube.com/@giftedtechnexus\n❒ 𝐎𝐰𝐧𝐞𝐫: https://t.me/giftedmd\n❒ 𝐑𝐞𝐩𝐨: https://github.com/mouricedevs/Gifted-Md\n❒ 𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥: https://whatsapp.com/channel/0029VaYauR9ISTkHTj4xvi1l\n❒ 𝐆𝐢𝐭𝐡𝐮𝐛: https://github.com/mouricedevs\n❒ 𝐓𝐮𝐭𝐨𝐫𝐢𝐚𝐥: https://youtu.be/seXFFjtnU64?si=yvUXm4UWYcX8ZJDp\n❒ 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫: Gifted Tech\n║ 💜💜💜\n╚═══════════════╝\n 𝗚𝗜𝗙𝗧𝗘𝗗-𝗠𝗗 𝗩𝗘𝗥𝗦𝗜𝗢𝗡 𝟰.𝟬.𝟬\n___________________________\nUse the SessionID above to deploy your bot.\nUse the tutorial link to get a guide on deployment process. \nDon't Forget To Fork and Give a Star⭐ To My Repo\n"
      }, {
        quoted: _0xbd3957
      });
      try {
        await _0x406138.sendMessage(_0x45fce1, {
          text: "*https://whatsapp.com/channel/0029VaYauR9ISTkHTj4xvi1l*\nJoin Our Whatsapp Channel And Follow it for Daily Updates About the Bot.\n",
          contextInfo: {
            externalAdReply: {
              title: "GIFTED MD",
              body: "MULTIDEVICE WHATSAPP BOT",
              renderLargerThumbnail: false,
              thumbnail: "https://telegra.ph/file/54efddccf41281ad7ec51.jpg",
              mediaType: 1,
              mediaUrl: "./scan.mp3",
              sourceUrl: "https://whatsapp.com/channel/0029VaJmfmTDJ6H7CmuBss0o"
            }
          }
        });
      } catch (_0x3f28f2) {
        console.error(_0x3f28f2);
      }
      await delay(1000);
      try {
        remove(dirName);
      } catch {}
      process.exit(1);
    }
  });
  _0x406138.ev.on("creds.update", _0x17e60a);
}
start();
