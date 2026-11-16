/* Party Riders — built on the Stitch "Regal Celebration" markup.
 * Planner workspace, client portal and guest RSVP in one page with hash routes and shared state.
 */
(function () {
  "use strict";

  // ---------- Reference data ----------
  var TODAY = new Date("2026-11-03T12:00:00");
  var PLANNER = { name: "Adanna Balogun", first: "Adanna", role: "Lead Planner", phone: "+234 802 555 0147" };

  var VENDORS = [
    { id: "ofada", name: "Ofada & Co. Kitchens", cat: "Catering", area: "Yaba, Lagos", price: "₦3.5M–₦7.5M", rating: 4.9, reviews: 64, jobs: 31, img: "v-ofada",
      blurb: "Contemporary Nigerian and Afro-fusion menus with live stations.", tags: ["Fine dining", "Live stations"],
      points: ["Smoky party jollof and fried rice", "Pounded yam, egusi and grilled fish", "24 servers (1 per 15 guests)", "Tasting for 4"] },
    { id: "itan", name: "Ìtàn Catering House", cat: "Catering", area: "Surulere, Lagos", price: "₦2.5M–₦4.5M", rating: 4.75, reviews: 95, jobs: 18, img: "v-itan",
      blurb: "Legendary party jollof, ofada rice and generous owambe portions.", tags: ["Bulk capacity", "Uniformed staff"],
      points: ["Party jollof, ofada rice and ayamase", "Asun and peppered snail", "20 servers (1 per 18 guests)", "Tasting for 2"] },
    { id: "gold", name: "Gold Thread Decor", cat: "Decor", area: "Ikoyi, Lagos", price: "₦3M–₦8M", rating: 4.95, reviews: 112, jobs: 26, img: "v-gold",
      blurb: "Grand stage installations, immersive floral ceilings and table styling.", tags: ["Custom trussing", "Fresh florals"],
      points: ["Stage and backdrop build", "Floral ceiling installation", "Table styling for all guests"] },
    { id: "lagoon", name: "Lagoon Lens Studio", cat: "Photography", area: "Lekki Phase 1, Lagos", price: "₦2M–₦4.5M", rating: 4.88, reviews: 89, jobs: 22, img: "v-lagoon",
      blurb: "Documentary wedding storytelling and aerial 4K cinematography.", tags: ["Same-day edit", "Drone pilot"],
      points: ["Two photographers, full day", "4K film with drone", "Same-day highlight edit"] },
    { id: "highlife", name: "Highlife Republic", cat: "Live band", area: "Ikeja GRA, Lagos", price: "₦1.5M–₦3M", rating: 4.9, reviews: 78, jobs: 15, img: "v-highlife",
      blurb: "Highlife and juju ensemble with full sound and lighting rig.", tags: ["Live horns", "Sound rig"],
      points: ["10-piece band", "Full sound and lights", "Four-hour set"] },
    { id: "ayo", name: "Ayo Bankole", cat: "MC", area: "Surulere, Lagos", price: "₦500k–₦1.2M", rating: 4.9, reviews: 140, jobs: 40, img: null,
      blurb: "Bilingual MC who keeps elders and the dance floor happy.", tags: ["Yoruba and English", "Alaga ready"],
      points: ["Reception host", "Bilingual programme", "Rehearsal attendance"] },
    { id: "crumb", name: "Crumb & Crown Cakes", cat: "Cake", area: "Ikoyi, Lagos", price: "₦350k–₦900k", rating: 4.8, reviews: 58, jobs: 29, img: null,
      blurb: "Sculpted tiered cakes with sugar flowers and gold leaf.", tags: ["Tiered cakes", "Delivery and setup"],
      points: ["Tiered celebration cake", "Tasting box", "Delivery and setup"] },
    { id: "adire", name: "Adire Loom Fabrics", cat: "Aso Ebi", area: "Oshodi, Lagos", price: "₦18k–₦60k per guest", rating: 4.6, reviews: 66, jobs: 34, img: "aso-ebi",
      blurb: "Aso-oke, lace and gele bundles dispatched to both families.", tags: ["Bulk orders", "Family dispatch"],
      points: ["Fabric for couple and families", "Gele bundles", "Delivery to both families"] },
    { id: "puff", name: "Puff & Pepper Chops", cat: "Small chops", area: "Ajah, Lagos", price: "₦1.5k–₦2.5k per guest", rating: 4.7, reviews: 51, jobs: 27, img: null,
      blurb: "Cocktail packs, puff-puff stations and suya bars.", tags: ["Live stations", "Packs"],
      points: ["Cocktail pack per guest", "Puff-puff station", "Served by four staff"] },
    { id: "sentinel", name: "Sentinel Event Security", cat: "Security", area: "Victoria Island, Lagos", price: "₦300k–₦800k", rating: 4.4, reviews: 22, jobs: 12, img: null,
      blurb: "Uniformed guards, VIP escort and parking control.", tags: ["VIP escort", "Parking"],
      points: ["10 uniformed guards", "Parking control", "VIP escort"] },
    { id: "glow", name: "Glow by Temi", cat: "Makeup", area: "Victoria Island, Lagos", price: "₦800k–₦1.8M", rating: 4.92, reviews: 153, jobs: 37, img: "v-glow",
      blurb: "Bridal makeup and architectural gele tying.", tags: ["Bridal suite", "Touch-up crew"],
      points: ["Bride and bridal party", "Gele tying", "Touch-up crew all day"] }
  ];
  var CAT_ICON = { Venue: "location_city", Catering: "restaurant", "Small chops": "tapas", Decor: "local_florist", Photography: "photo_camera", MC: "mic",
    "Live band": "music_note", Cake: "cake", "Aso Ebi": "checkroom", Security: "shield", Makeup: "brush", Other: "category" };
  var CATS = Object.keys(CAT_ICON);
  var TYPE_LABEL = { Wedding: "Traditional & White Wedding", Birthday: "Milestone Birthday", Corporate: "Corporate Celebration", Memorial: "Celebration of Life", Concert: "Concert & Show", Engagement: "Traditional Engagement" };

  var TEMPLATES_SEED = [
    { id: "owambe", name: "Lagos Owambe Grand Wedding", type: "Wedding", guests: "300–400", budget: "₦15M–₦25M", lead: "6–9 months", style: "Plated & live bar", img: "tpl-owambe", popular: true,
      blurb: "Aso Ebi logistics, live band and alaga, banquet with live stations, and security.",
      parts: [["Venue", "Hall and grounds", .24], ["Catering", "Buffet for all guests", .23], ["Small chops", "Cocktail packs", .04], ["Decor", "Stage, florals and tables", .17], ["Photography", "Photo and film, full day", .1], ["MC", "Reception host", .05], ["Live band", "Band and sound", .08], ["Cake", "Wedding cake", .035], ["Aso Ebi", "Couple and family fabric", .02], ["Security", "Guards and parking", .025]] },
    { id: "church", name: "Intimate Church Wedding", type: "Wedding", guests: "100–200", budget: "₦6M–₦10M", lead: "4–6 months", style: "Plated dinner", img: null,
      blurb: "Church ceremony with a small reception and plated dinner.",
      parts: [["Venue", "Reception hall", .25], ["Catering", "Plated dinner", .3], ["Decor", "Church and hall florals", .15], ["Photography", "Photo coverage", .12], ["MC", "Reception host", .06], ["Cake", "Wedding cake", .05], ["Makeup", "Bride and party", .07]] },
    { id: "milestone", name: "Milestone Birthday", type: "Birthday", guests: "100–200", budget: "₦5M–₦9M", lead: "2–4 months", style: "Buffet", img: null,
      blurb: "40th, 50th and 60th celebrations with a live band.",
      parts: [["Venue", "Hall", .2], ["Catering", "Buffet", .3], ["Decor", "Stage and tables", .18], ["Photography", "Photo coverage", .1], ["Live band", "Band and sound", .14], ["Cake", "Celebration cake", .04], ["Security", "Guards", .04]] },
    { id: "memorial", name: "Celebration of Life", type: "Memorial", guests: "200–300", budget: "₦4M–₦8M", lead: "3–6 weeks", style: "Buffet", img: null,
      blurb: "Service, reception canopies and a tribute programme.",
      parts: [["Venue", "Reception ground", .22], ["Catering", "Buffet", .35], ["Decor", "Canopies and chairs", .2], ["Photography", "Coverage and tribute video", .1], ["Security", "Guards and traffic", .05], ["Other", "Programme printing", .08]] },
    { id: "corporate", name: "Corporate Gala", type: "Corporate", guests: "150–250", budget: "₦10M–₦15M", lead: "2–3 months", style: "Three-course", img: null,
      blurb: "Awards dinner with stage branding and a host.",
      parts: [["Venue", "Ballroom", .3], ["Catering", "Three-course dinner", .3], ["Decor", "Stage and branding", .15], ["Photography", "Photo and highlight film", .08], ["MC", "Host", .06], ["Live band", "Band", .08], ["Security", "Guards", .03]] }
  ];
  var ARCHETYPES = [
    { type: "Wedding", icon: "favorite", label: "Wedding", sub: "Owambe & receptions" },
    { type: "Birthday", icon: "celebration", label: "Milestone Bday", sub: "40th, 50th, jubilees" },
    { type: "Memorial", icon: "local_florist", label: "Life Celebration", sub: "Memorial receptions" },
    { type: "Corporate", icon: "domain", label: "Corporate Gala", sub: "Awards & banquets" },
    { type: "Concert", icon: "stadium", label: "Concert & Show", sub: "Festivals & showcases" }
  ];

  function itemFrom(a) { return { id: a[0], cat: a[1], name: a[2], venue: a[3], vendor: a[4], est: a[5], actual: a[6], status: a[7] }; }
  function seed() {
    return {
      events: [
        { id: "adaeze", name: "Adaeze & Tunde's Wedding", short: "Adaeze & Tunde", type: "Wedding", date: "2026-12-12", venue: "Eko Pearl Event Centre, Lekki, Lagos", guests: 350, vip: 80, budget: 18500000, img: "event-adaeze",
          client: { name: "Adaeze Okafor", short: "Adaeze", phone: "+234 803 412 7781" },
          items: [
            ["i1", "Venue", "Hall and oceanfront grounds", "Eko Pearl Event Centre", null, 4500000, 4500000, "confirmed"],
            ["i2", "Catering", "Banquet and traditional buffet for 350", "", null, 4350000, null, "pending"],
            ["i3", "Small chops", "350 cocktail packs and puff-puff station", "", "puff", 700000, null, "pending"],
            ["i4", "Decor", "Floral ceiling, stage and table styling", "", "gold", 3200000, 3200000, "confirmed"],
            ["i5", "Photography", "Photo and 4K film, full day", "", "lagoon", 1900000, 1900000, "confirmed"],
            ["i6", "MC", "Reception host and alaga", "", "ayo", 850000, 850000, "confirmed"],
            ["i7", "Live band", "Highlife band and sound rig", "", "highlife", 1500000, null, "pending"],
            ["i8", "Cake", "Tiered wedding cake", "", null, 650000, null, "unbooked"],
            ["i9", "Aso Ebi", "Couple and family fabric", "", "adire", 400000, 400000, "confirmed"],
            ["i10", "Security", "10 guards and parking control", "", null, 450000, null, "unbooked"]
          ].map(itemFrom) },
        { id: "folake", name: "Folake at 50 Jubilee Gala", short: "Folake at 50", type: "Birthday", date: "2026-11-28", venue: "Monarch Event Centre, Lekki", guests: 200, budget: 9000000, img: "event-folake",
          client: { name: "Folake Adeyemi", short: "Folake", phone: "+234 809 220 4410" },
          items: [
            ["f1", "Venue", "Hall", "Monarch Event Centre", null, 1800000, 1800000, "confirmed"],
            ["f2", "Catering", "Buffet for 200", "", "itan", 2700000, 2700000, "confirmed"],
            ["f3", "Decor", "Stage and tables", "", "gold", 1900000, 2050000, "confirmed"],
            ["f4", "Live band", "Juju band", "", "highlife", 1400000, 1400000, "confirmed"],
            ["f5", "Aso Ebi", "Family fabric", "", "adire", 600000, null, "pending"],
            ["f6", "Photography", "Photo coverage", "", null, 700000, null, "unbooked"]
          ].map(itemFrom) },
        { id: "zenvia", name: "Zenvia End of Year Gala", short: "Zenvia Gala", type: "Corporate", date: "2026-12-18", venue: "Lantern Hall, Victoria Island", guests: 250, budget: 16000000, img: "event-zenvia",
          client: { name: "Ifeoma Nwachukwu", short: "Ifeoma", phone: "+234 816 300 9921" },
          items: [
            ["z1", "Venue", "Ballroom", "Lantern Hall", null, 4800000, 4800000, "confirmed"],
            ["z2", "Catering", "Three-course dinner", "", "ofada", 4600000, 4600000, "confirmed"],
            ["z3", "Decor", "Stage and branding", "", "gold", 2400000, null, "pending"],
            ["z4", "MC", "Host", "", "ayo", 900000, 900000, "confirmed"],
            ["z5", "Live band", "Band and sound check", "", "highlife", 1300000, null, "pending"],
            ["z6", "Security", "Guards and parking", "", null, 500000, null, "unbooked"]
          ].map(itemFrom) },
        { id: "kemi", name: "Kemi & Chinedu Wedding", short: "Kemi & Chinedu", type: "Wedding", date: "2027-01-16", venue: "Ocean Crest Hall, Victoria Island", guests: 500, budget: 24000000, img: "event-kemi",
          client: { name: "Kemi Ola", short: "Kemi", phone: "+234 805 118 3302" },
          items: [
            ["k1", "Venue", "Hall", "Ocean Crest Hall", null, 5800000, 5800000, "confirmed"],
            ["k2", "Catering", "Buffet for 500", "", null, 6200000, null, "unbooked"],
            ["k3", "Decor", "Stage and florals", "", "gold", 4200000, null, "pending"],
            ["k4", "Photography", "Photo and film", "", "lagoon", 2100000, 2100000, "confirmed"],
            ["k5", "MC", "Reception host", "", null, 900000, null, "unbooked"],
            ["k6", "Makeup", "Bride and party", "", "glow", 1200000, null, "pending"]
          ].map(itemFrom) },
        { id: "aramide", name: "Aramide & Babatunde Engagement", short: "Aramide & Babatunde", type: "Engagement", date: "2027-02-05", venue: "Landmark Centre, Oniru", guests: 400, budget: 15000000, img: "event-aramide",
          client: { name: "Aramide Lawal", short: "Aramide", phone: "+234 802 740 1166" },
          items: [
            ["r1", "Venue", "Hall", "Landmark Centre", null, 3600000, 3600000, "confirmed"],
            ["r2", "Catering", "Buffet for 400", "", null, 4800000, null, "unbooked"],
            ["r3", "Decor", "Alaga stage", "", "gold", 2800000, null, "pending"],
            ["r4", "Aso Ebi", "Family fabric", "", "adire", 900000, null, "pending"]
          ].map(itemFrom) },
        { id: "bisi", name: "Mama Bisi at 60", short: "Mama Bisi at 60", type: "Birthday", date: "2026-10-18", venue: "Grand Oak Hall, Ibadan", guests: 180, budget: 9000000, img: "event-bisi", completed: true,
          client: { name: "Tayo Adebisi", short: "Tayo", phone: "+234 803 555 0192" },
          items: [
            ["m1", "Venue", "Hall", "Grand Oak Hall", null, 1800000, 1800000, "confirmed"],
            ["m2", "Catering", "Buffet for 180", "", "itan", 2700000, 2550000, "confirmed"],
            ["m3", "Decor", "Stage and tables", "", "gold", 1600000, 1750000, "confirmed"],
            ["m4", "Photography", "Photo coverage", "", "lagoon", 900000, 850000, "confirmed"],
            ["m5", "Live band", "Juju band and sound", "", "highlife", 1200000, 1200000, "confirmed"],
            ["m6", "MC", "Host", "", "ayo", 250000, 250000, "confirmed"],
            ["m7", "Security", "Guards", "", "sentinel", 250000, 250000, "confirmed"],
            ["m8", "Other", "Programme printing", "Ibadan Print House", null, 300000, 320000, "confirmed"]
          ].map(itemFrom),
          closeout: { template: "Ibadan Milestone Birthday, 150–200 guests", share: true, ratings: {}, verified: 172,
            lessons: "Order the programme a week earlier; the printer ran late.\nDecor ran ₦150,000 over after a balloon arch was added on the day. Price extras before agreeing to them." } }
      ],
      approvals: [
        { id: "a-catering", event: "adaeze", item: "i2", status: "draft", rec: 0, chosen: null, deadline: "2026-11-14", whatsapp: true,
          note: "Both caterers cover jollof, fried rice, pounded yam with egusi and small chops. I recommend Ofada & Co. for the bigger service team, so the reception queue moves faster. Ìtàn saves ₦400,000.",
          options: [{ vendor: "ofada", price: 4350000, img: "food-ofada", points: null }, { vendor: "itan", price: 3950000, img: "food-itan", points: null }] }
      ],
      guests: {
        stats: { invited: 350, attending: 212, declined: 41, pending: 97 }, reminded: false,
        rows: [
          ["Chief Emeka Okonkwo", "+234 803 334 1120", "Bride's side", "Table 01 · High table", "attending", "paid"],
          ["Mrs. Folashade Adebayo", "+234 803 555 9812", "Groom's side", "Table 01 · High table", "attending", "paid"],
          ["Dr. Chinedu Eze", "+234 807 123 4567", "Bride's side", "Table 04", "attending", "paid"],
          ["Funke Akindele-Bello", "+234 814 889 0012", "VIP / Friend", "Table 02 · VVIP lounge", "attending", "paid"],
          ["Babatunde Oladipo", "+234 806 778 1102", "Groom's side", "Table 12", "attending", "unpaid"],
          ["Nkemdilim Nwosu", "+234 812 777 6543", "Bride's side", "Table 07", "pending", "unpaid"],
          ["Femi Adeleke", "+234 805 099 1234", "Groom's side", "Unassigned", "pending", "none"],
          ["Zainab Ali-Hassan", "+234 818 222 3456", "VIP guest", "—", "declined", "none"],
          ["Ngozi Eze", "+234 803 441 2219", "Bride's side", "Table 12", "attending", "paid"],
          ["Yetunde Alabi", "+234 809 661 0042", "Groom's side", "Unassigned", "pending", "unpaid"]
        ]
      },
      tasks: [
        { id: "t1", text: "Send caterer shortlist to Adaeze", event: "adaeze", go: "send-adaeze-i2", due: "Today", time: "11:30 AM", pri: "High priority", done: false },
        { id: "t2", text: "Find a cake vendor for Adaeze & Tunde", event: "adaeze", go: "event-adaeze-plan", due: "Today", time: "2:00 PM", pri: "", done: false },
        { id: "t3", text: "Send Aso Ebi payment reminders", event: "folake", go: "event-folake-plan", due: "Today", time: "4:30 PM", pri: "", done: false },
        { id: "t4", text: "Close out Mama Bisi at 60", event: "bisi", go: "event-bisi-closeout", due: "Fri 6 Nov", time: "", pri: "", done: false },
        { id: "t5", text: "Confirm band sound check time", event: "zenvia", go: "event-zenvia-plan", due: "Fri 6 Nov", time: "", pri: "", done: false }
      ],
      activity: [
        { icon: "photo_camera", text: "Adanna confirmed Lagoon Lens Studio for photo and film", when: "2 hours ago" },
        { icon: "checkroom", text: "Aso Ebi fabric bundles delivered to both families", when: "Yesterday" },
        { icon: "group", text: "48 more guests said yes this week", when: "2 days ago" }
      ],
      templates: TEMPLATES_SEED.map(function (t) { var c = Object.assign({}, t); c.from = null; return c; }),
      rsvp: null
    };
  }

  // ---------- State ----------
  var KEY = "party-riders-stitch-v1";
  var S;
  try { S = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { S = null; }
  if (!S || !S.events) S = seed();
  // People, invites, engagement and notes per event; filled in for older saved data too.
  function enrich() {
    var D = {
      adaeze: { invite: "accepted", sent: "28 Oct", pkg: "Full planning", fee: 2800000, paid: 1400000,
        members: [{ id: "m1", name: "Tunde Bakare", rel: "Groom", phone: "+234 806 552 0918", role: "approver", status: "accepted" },
                  { id: "m2", name: "Mrs. Ngozi Okafor", rel: "Bride's mother", phone: "+234 803 200 7741", role: "viewer", status: "invited" }],
        notes: [{ id: "n1", text: "Adaeze's mum prefers Ofada & Co. but the couple are price-sensitive. Lead with value when we present caterers.", when: "2 Nov" },
                { id: "n2", text: "Venue allows decor setup from 6 AM only. Tell Gold Thread before they quote overtime.", when: "30 Oct" }] },
      folake: { invite: "accepted", sent: "12 Oct", pkg: "Partial planning", fee: 1200000, paid: 1200000, members: [{ id: "m3", name: "Kunle Adeyemi", rel: "Husband", phone: "+234 802 118 4410", role: "approver", status: "accepted" }], notes: [] },
      zenvia: { invite: "accepted", sent: "20 Oct", pkg: "Coordination only", fee: 900000, paid: 450000, members: [], notes: [{ id: "n3", text: "Finance needs invoices addressed to Zenvia Group Ltd with VAT shown separately.", when: "25 Oct" }] },
      kemi: { invite: "sent", sent: "1 Nov", pkg: "Full planning", fee: 3200000, paid: 0, members: [], notes: [] },
      aramide: { invite: "none", sent: "", pkg: "Partial planning", fee: 1500000, paid: 0, members: [], notes: [] },
      bisi: { invite: "accepted", sent: "1 Sep", pkg: "Partial planning", fee: 1300000, paid: 1300000, members: [], notes: [] }
    };
    S.events.forEach(function (e) {
      var d = D[e.id] || { invite: "none", sent: "", pkg: "Full planning", fee: 0, paid: 0, members: [], notes: [] };
      if (!e.client.invite) { e.client.invite = d.invite; e.client.sent = d.sent; }
      if (!e.members) e.members = d.members;
      if (!e.notes) e.notes = d.notes;
      if (!e.eng) e.eng = { pkg: d.pkg, fee: d.fee, paid: d.paid };
    });
    if (!S.vendorsExtra) S.vendorsExtra = [];
    if (!S.portal) S.portal = "adaeze";
  }
  enrich();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage unavailable */ } }
  var ui = { taskEvent: "All", evFilter: "All", itemQuery: "", itemCat: "All", guestFilter: "all", guestQuery: "", vendorCat: "All", vendorQuery: "", confirm: null, from: null,
    newEvent: { step: 1, type: "Wedding", tpl: "owambe" }, pick: {}, search: "" };

  // ---------- Helpers ----------
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function naira(n) { return "₦" + Math.round(n).toLocaleString("en-NG"); }
  function short(n) {
    if (n >= 1e6) { var v = n / 1e6; return "₦" + (v >= 10 ? v.toFixed(1) : v.toFixed(2)).replace(/\.?0+$/, "") + "M"; }
    if (n >= 1e3) return "₦" + Math.round(n / 1e3) + "k";
    return naira(n);
  }
  function ic(name, cls, fill) { return '<span class="material-symbols-outlined ' + (cls || "") + '"' + (fill ? ' style="font-variation-settings:\'FILL\' 1"' : "") + ' aria-hidden="true">' + name + "</span>"; }
  // Photo with a branded fallback tile underneath (shown until the photo files are added).
  function photo(key, cls, fallbackIcon, alt) {
    return '<span class="relative overflow-hidden flex items-center justify-center bg-primary-fixed/50 text-primary-container shrink-0 ' + cls + '">' + ic(fallbackIcon || "image", "text-[26px] opacity-60") +
      (key ? '<img data-photo src="assets/img/' + key + '.jpg" alt="' + esc(alt || "") + '" class="absolute inset-0 w-full h-full object-cover" loading="lazy">' : "") + "</span>";
  }
  function daysTo(d) { return Math.round((new Date(d + "T12:00:00") - TODAY) / 864e5); }
  var MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var MONL = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  function fmtDate(d, long) { var p = d.split("-"); return +p[2] + " " + (long ? MONL : MON)[+p[1] - 1] + " " + p[0]; }
  function weekday(d) { return DAYS[new Date(d + "T12:00:00").getDay()]; }
  function initials(n) { return n.replace(/^(Chief|Mrs?\.|Dr\.)\s+/, "").split(/[\s&]+/).filter(Boolean).map(function (w) { return w[0]; }).slice(0, 2).join("").toUpperCase(); }
  function ev(id) { return S.events.filter(function (e) { return e.id === id; })[0]; }
  function allVendors() { return VENDORS.concat(S.vendorsExtra || []); }
  function vendor(id) { return allVendors().filter(function (v) { return v.id === id; })[0]; }
  function itemOf(e, id) { return e.items.filter(function (i) { return i.id === id; })[0]; }
  function vendorName(it) { return it.vendor ? vendor(it.vendor).name : (it.venue || ""); }
  function apprFor(itemId) { return S.approvals.filter(function (a) { return a.item === itemId && a.status !== "approved"; })[0]; }
  function apprById(id) { return S.approvals.filter(function (a) { return a.id === id; })[0]; }
  function money(e) {
    var committed = 0, est = 0, confirmed = 0, review = 0;
    e.items.forEach(function (i) { est += i.est; if (i.status === "confirmed") { committed += i.actual != null ? i.actual : i.est; confirmed++; } else if (i.status === "pending") review++; });
    return { committed: committed, est: est, remaining: e.budget - committed, confirmed: confirmed, review: review, total: e.items.length, pct: Math.min(100, committed / e.budget * 100) };
  }
  function health(e) {
    var m = money(e), d = daysTo(e.date);
    if (e.completed) return e.closed ? "closed" : "closeout";
    if (m.est > e.budget || (d < 30 && m.confirmed / m.total < .75)) return "attention";
    return "track";
  }
  function healthChip(h) {
    if (h === "track") return '<span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5E9] text-[#1B5E20] font-label-sm text-label-sm font-bold"><span class="w-2 h-2 rounded-full bg-[#34c759]"></span>On track</span>';
    if (h === "attention") return '<span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[#b25000] font-label-sm text-label-sm font-bold"><span class="w-2 h-2 rounded-full bg-[#ff9f0a]"></span>Needs attention</span>';
    if (h === "closeout") return '<span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-bold"><span class="w-2 h-2 rounded-full bg-primary-container"></span>Close-out due</span>';
    return '<span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-bold"><span class="w-2 h-2 rounded-full bg-outline"></span>Closed</span>';
  }
  function statusChip(it) {
    var a = apprFor(it.id), s = a && a.status === "sent" ? ["border-2 border-plum", "Client review"] : it.status === "confirmed" ? ["bg-plum", "Confirmed"] : it.status === "pending" ? ["border-2 border-gold", "Pending"] : ["bg-outline-variant", "Unbooked"];
    return '<span class="inline-flex items-center gap-1.5 text-[13px] font-medium text-on-surface-variant whitespace-nowrap"><span class="w-2 h-2 rounded-full box-border ' + s[0] + '"></span>' + s[1] + "</span>";
  }
  var BTN = "pr-btn inline-flex items-center justify-center gap-1.5 bg-transparent border-[1.5px] border-plum text-plum hover:bg-plum hover:text-white text-[14px] font-semibold tracking-[-0.01em] px-5 py-2 rounded-full disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-plum";
  var BTN_SOFT = "pr-btn inline-flex items-center justify-center gap-1.5 bg-transparent border-[1.5px] border-outline-variant text-on-surface hover:border-on-surface text-[14px] font-semibold tracking-[-0.01em] px-5 py-2 rounded-full disabled:opacity-40 disabled:cursor-not-allowed";
  var BTN_GOLD = BTN;
  var CARD = "bg-surface-container-lowest rounded-[22px] pr-soft";
  var LABEL = "text-[12px] leading-4 text-outline font-medium";
  var INPUT = "w-full h-11 px-4 bg-surface-container-low border-0 rounded-xl text-[15px] text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-container/30 transition-shadow";
  var PILL_ON = "px-4 py-1.5 rounded-full text-[13px] font-semibold bg-on-surface text-white whitespace-nowrap transition-colors";
  var PILL_OFF = "px-4 py-1.5 rounded-full text-[13px] font-medium text-on-surface-variant hover:bg-surface-container whitespace-nowrap transition-colors";

  var PKGS = ["Coordination only", "Partial planning", "Full planning"];
  function portalLink(e) { return "partyriders.app/p/" + e.id; }
  function inviteText(e, name) { return "Hi " + name.split(" ")[0] + "! " + PLANNER.first + " from Party Riders here. Your portal for " + e.name + " is ready. Follow every booking and approve choices from your phone: " + portalLink(e); }
  function inviteChip(st) {
    var s = st === "accepted" ? ["bg-plum", "Joined"] : st === "sent" || st === "invited" ? ["border-2 border-gold", "Invite sent"] : ["bg-outline-variant", "Not invited"];
    return '<span class="inline-flex items-center gap-1.5 text-[13px] font-medium text-on-surface-variant whitespace-nowrap"><span class="w-2 h-2 rounded-full box-border ' + s[0] + '"></span>' + s[1] + "</span>";
  }
  function payState(g) { return g.paid >= g.fee && g.fee > 0 ? "Paid in full" : g.paid > 0 ? "Deposit paid" : "Awaiting deposit"; }
  function toast(msg, icon) {
    document.querySelectorAll(".pr-toast").forEach(function (o) { o.remove(); });
    var t = document.createElement("div");
    t.className = "pr-toast fixed left-1/2 -translate-x-1/2 z-[80] flex items-center gap-space-sm bg-primary text-on-primary font-body-sm text-body-sm font-medium pl-4 pr-5 py-3 rounded-full shadow-2xl max-w-[calc(100vw-32px)]";
    t.setAttribute("role", "status");
    t.innerHTML = ic(icon || "check_circle", "text-secondary-container text-[20px]", true) + "<span>" + esc(msg) + "</span>";
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 3400);
  }

  // ---------- Router ----------
  function route() { return (location.hash || "").replace(/^#/, "") || "events"; }
  function go(r) { if (route() === r) render(true); else location.hash = r; }
  window.addEventListener("hashchange", function () { closeDrawer(); ui.confirm = null; render(true); });

  function render(top) {
    var r = route(), html;
    if (r === "rsvp") html = viewRSVP();
    else if (/^client-/.test(r)) html = viewPortal(r);
    else html = shell(r);
    var root = document.getElementById("root");
    var swap = function () {
      root.innerHTML = html;
      root.classList.toggle("pr-enter", !!top);
      if (top) {
        window.scrollTo(0, 0);
        root.querySelectorAll("[data-stagger]").forEach(function (g) {
          Array.prototype.forEach.call(g.children, function (c, i) { c.style.setProperty("--d", Math.min(i, 8) * 55 + "ms"); });
        });
      }
    };
    var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (top && document.startViewTransition && !calm && !document.hidden && root.childElementCount) {
      try {
        var vt = document.startViewTransition(swap);
        [vt.ready, vt.finished, vt.updateCallbackDone].forEach(function (pr) { if (pr && pr.catch) pr.catch(function () { /* skipped transition is fine */ }); });
      } catch (x) { swap(); }
    } else swap();
  }
  // ---------- Planner shell (Stitch sidebar + glass header) ----------
  function shell(r) {
    var m, view, nav = "events";
    if (r === "events") view = viewEvents();
    else if (r === "tasks") { view = viewTasks(); nav = "tasks"; }
    else if (r === "vendors") { view = viewVendors(); nav = "vendors"; }
    else if (r === "templates") { view = viewTemplates(); nav = "templates"; }
    else if (r === "clients") { view = viewClients(); nav = "clients"; }
    else if (r === "new-event") { view = viewNewEvent(); nav = "templates"; }
    else if ((m = r.match(/^event-([a-z0-9]+)-(plan|guests|approvals|people|notes|closeout)$/)) && ev(m[1])) view = viewWorkspace(ev(m[1]), m[2]);
    else if ((m = r.match(/^send-([a-z0-9]+)-([a-z0-9-]+)$/)) && ev(m[1]) && itemOf(ev(m[1]), m[2])) view = viewSend(ev(m[1]), itemOf(ev(m[1]), m[2]));
    else view = viewEvents();
    var open = S.tasks.filter(function (t) { return !t.done; }).length;
    var links = [["events", "celebration", "Events"], ["tasks", "checklist", "Tasks"], ["vendors", "storefront", "Vendors"], ["templates", "auto_stories", "Templates"], ["clients", "contacts", "Clients"]];
    function link(l, mobile) {
      var on = nav === l[0];
      return '<a href="#' + l[0] + '" class="flex items-center gap-space-md ' + (mobile ? "px-space-sm py-1.5 shrink-0" : "px-space-md py-space-sm") + " rounded-xl transition-colors " +
        (on ? "bg-surface-container text-on-surface font-semibold" : "text-on-surface-variant hover:bg-surface-container/60 hover:text-on-surface") + '"' + (on ? ' aria-current="page"' : "") + ">" +
        ic(l[1], "text-headline-sm") + '<span class="font-body-md text-body-md font-medium' + (mobile ? " hidden sm:inline" : "") + '">' + l[2] + "</span>" +
        (l[0] === "tasks" && open && !mobile ? '<span class="ml-auto bg-secondary text-on-secondary px-1.5 py-0.5 rounded-full text-label-sm font-bold">' + open + "</span>" : "") + "</a>";
    }
    var results = searchResults();
    return '<aside style="view-transition-name:pr-side" class="hidden lg:flex fixed left-0 top-0 h-full w-72 bg-surface-container-lowest/80 backdrop-blur-xl border-r border-black/[0.05] z-50 flex-col justify-between py-space-lg">' +
        '<div class="flex flex-col gap-space-xl px-space-lg">' + logo() +
          '<div class="flex flex-col gap-space-xs"><span class="font-label-sm text-label-sm text-outline px-space-sm mb-space-xs">Workspace</span><nav class="flex flex-col gap-space-xs" aria-label="Workspace">' + links.map(function (l) { return link(l); }).join("") + "</nav></div></div>" +
        '<div class="px-space-lg flex flex-col gap-space-sm"><div class="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-xs"><div class="flex items-center gap-space-xs">' + ic("workspace_premium", "text-headline-sm text-secondary") +
          '<span class="font-label-md text-label-md text-on-surface font-semibold">Lagos Concierge</span></div><p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">' + S.events.filter(function (e) { return !e.completed; }).length + " celebrations in production.</p>" +
          '<button class="self-start font-label-sm text-label-sm text-outline underline underline-offset-2 hover:text-primary mt-1" data-act="reset">Reset sample data</button></div></div>' +
      "</aside>" +
      '<div class="lg:pl-72">' +
        '<header style="view-transition-name:pr-head" class="pr-head pr-glass fixed top-0 left-0 lg:left-72 right-0 h-20 border-b border-black/[0.05] z-40 flex items-center justify-between gap-space-md pr-gx">' +
          '<div class="flex items-center gap-space-md min-w-0 flex-1">' +
            '<a href="#events" class="lg:hidden w-9 h-9 rounded-xl bg-plum flex items-center justify-center text-gold shrink-0" aria-label="Party Riders home">' + ic("celebration", "text-[20px]") + "</a>" +
            '<div class="relative flex items-center w-full max-w-sm">' + ic("search", "absolute left-space-md text-outline pointer-events-none text-headline-sm") +
              '<label for="global-q" class="sr-only">Search events and vendors</label><input id="global-q" data-input="global-q" autocomplete="off" class="w-full h-11 pl-12 pr-space-md bg-surface-container-lowest border-0 rounded-xl font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" placeholder="Search events, vendors…" value="' + esc(ui.search) + '">' +
              (results ? '<div class="absolute top-full mt-2 left-0 right-0 bg-surface-container-lowest rounded-xl shadow-xl p-space-xs flex flex-col z-50">' + results + "</div>" : "") +
            "</div></div>" +
          '<div class="flex items-center gap-space-md sm:gap-space-lg shrink-0">' +
            '<a href="#new-event" class="' + BTN + '">' + ic("add", "text-title-md") + '<span class="hidden sm:inline">New Event</span></a>' +
            '<div class="flex items-center gap-space-md"><div class="hidden md:flex flex-col text-right"><span class="font-title-md text-title-md text-on-surface leading-tight font-semibold">' + PLANNER.name + '</span><span class="font-label-sm text-label-sm text-secondary font-bold flex items-center justify-end gap-1"><span class="inline-block w-1.5 h-1.5 rounded-full bg-secondary"></span>Lagos HQ</span></div>' +
              photo("planner", "w-9 h-9 rounded-full", "person", "Adanna Balogun") + "</div>" +
          "</div></header>" +
        '<nav style="view-transition-name:pr-mnav" class="lg:hidden fixed top-20 left-0 right-0 z-30 pr-glass border-b border-black/[0.05] flex gap-space-xs overflow-x-auto pr-gx py-space-xs" aria-label="Workspace">' + links.map(function (l) { return link(l, true); }).join("") + "</nav>" +
        '<main class="relative pt-32 lg:pt-20 w-full min-h-screen bg-background"><div class="w-full pr-gx py-space-lg pb-space-2xl flex flex-col gap-space-xl max-w-[1440px] mx-auto" data-view>' + view + "</div></main>" +
      "</div>";
  }
  function logo() {
    return '<a href="#events" class="flex items-center gap-space-sm"><span class="w-9 h-9 rounded-xl bg-plum flex items-center justify-center text-gold shadow-[0_2px_8px_rgba(74,25,66,0.12)]">' + ic("celebration", "text-[20px]") +
      '</span><span class="flex flex-col"><span class="font-title-md text-title-md tracking-tight text-primary font-bold">Party Riders</span><span class="font-label-sm text-label-sm text-secondary font-semibold">Celebration Studio</span></span></a>';
  }
  function searchResults() {
    var q = ui.search.trim().toLowerCase();
    if (q.length < 2) return "";
    var evs = S.events.filter(function (e) { return (e.name + " " + e.venue + " " + e.client.name).toLowerCase().indexOf(q) >= 0; }).slice(0, 4);
    var vs = allVendors().filter(function (v) { return (v.name + " " + v.cat).toLowerCase().indexOf(q) >= 0; }).slice(0, 4);
    if (!evs.length && !vs.length) return '<p class="px-space-md py-space-sm font-body-sm text-body-sm text-outline">No events or vendors match “' + esc(ui.search) + "”.</p>";
    return evs.map(function (e) { return '<a href="#event-' + e.id + "-" + (e.completed && !e.closed ? "closeout" : "plan") + '" data-act="clear-search" class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg hover:bg-surface-container-low">' + ic("celebration", "text-secondary text-title-md") + '<span class="font-body-sm text-body-sm font-semibold">' + esc(e.name) + '</span><span class="ml-auto font-label-sm text-label-sm text-outline">Event</span></a>'; }).join("") +
      vs.map(function (v) { return '<a href="#vendors" data-act="vendor-jump" data-id="' + v.cat + '" class="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg hover:bg-surface-container-low">' + ic(CAT_ICON[v.cat], "text-primary text-title-md") + '<span class="font-body-sm text-body-sm font-semibold">' + esc(v.name) + '</span><span class="ml-auto font-label-sm text-label-sm text-outline">' + esc(v.cat) + "</span></a>"; }).join("");
  }

  function pageHead(kicker, title, sub, actions) {
    return '<div class="flex flex-wrap items-end justify-between gap-space-lg pt-2"><div class="flex flex-col gap-2 max-w-3xl">' +
      (kicker ? '<span class="text-[15px] font-semibold text-secondary">' + kicker + "</span>" : "") +
      '<h1 class="pr-display text-primary">' + title + "</h1>" +
      (sub ? '<p class="pr-lede">' + sub + "</p>" : "") + "</div>" +
      (actions ? '<div class="flex flex-wrap items-center gap-space-sm">' + actions + "</div>" : "") + "</div>";
  }

  function statTile(icon, tint, label, value, sub) {
    return '<div class="' + CARD + ' p-6 flex flex-col gap-1"><span class="flex items-center gap-1.5 text-[13px] text-outline font-medium">' + ic(icon, "text-[18px] text-secondary") + label + "</span>" +
      '<span class="mt-2 text-[34px] leading-none font-bold tracking-[-0.035em] text-primary tabular-nums">' + value + "</span>" +
      (sub ? '<span class="text-[13px] text-on-surface-variant">' + sub + "</span>" : "") + "</div>";
  }
  // ---------- Events (dashboard) ----------
  function viewEvents() {
    var active = S.events.filter(function (e) { return !e.completed; }).sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    var done = S.events.filter(function (e) { return e.completed; });
    var types = ["All"].concat(active.map(function (e) { return e.type; }).filter(function (t, i, a) { return a.indexOf(t) === i; }));
    var shown = active.filter(function (e) { return ui.evFilter === "All" || e.type === ui.evFilter; });
    var value = active.reduce(function (s, e) { return s + e.budget; }, 0);
    var pending = S.approvals.filter(function (a) { return a.status !== "approved"; }).length;
    var today = S.tasks.filter(function (t) { return !t.done && t.due === "Today"; }).length;
    var hour = new Date().getHours(), greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    var pills = types.map(function (t) {
      var n = t === "All" ? active.length : active.filter(function (e) { return e.type === t; }).length;
      return '<button data-act="ev-filter" data-id="' + t + '" aria-pressed="' + (ui.evFilter === t) + '" class="px-space-md py-space-xs rounded-full font-label-md text-label-md font-semibold transition-all ' +
        (ui.evFilter === t ? "bg-on-surface text-white" : "text-on-surface-variant hover:bg-surface-container") + '">' + (t === "All" ? "All" : t + "s") + " (" + n + ")</button>";
    }).join("");
    return pageHead(greet + ", " + PLANNER.first, "All events.", "Every celebration in production, from Lekki to Ibadan.",
        '<a class="' + BTN_GOLD + '" href="#new-event">' + ic("add_circle", "text-title-md") + "Create Event</a>") +
      '<div class="flex flex-wrap gap-space-sm" role="group" aria-label="Filter events">' + pills + "</div>" +
      '<section class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5" data-stagger>' +
        statTile("theater_comedy", "bg-surface-container text-primary", "Active events", active.length, "Productions") +
        statTile("payments", "bg-secondary-container/30 text-secondary", "Production value", short(value), "") +
        statTile("task_alt", "bg-primary-fixed/40 text-primary-container", "Pending approvals", pending, pending ? "With clients" : "") +
        statTile("assignment_late", "bg-secondary-fixed/40 text-on-secondary-container", "Due today", today, "Tasks") +
      "</section>" +
      '<div class="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">' +
        '<div class="min-w-0 xl:col-span-8 flex flex-col gap-6"><div class="flex items-center gap-3"><h2 class="font-headline-md text-headline-md text-primary font-bold">Event Roster</h2><span class="bg-surface-container px-3 py-1 rounded-full font-label-sm text-label-sm font-semibold text-on-surface-variant">' + shown.length + " active</span></div>" +
          '<div class="flex flex-col gap-6" data-stagger>' + shown.map(eventCard).join("") + "</div>" +
          (done.length && ui.evFilter === "All" ? '<h2 class="font-headline-sm text-headline-sm text-primary font-bold mt-2">Recently finished</h2><div class="flex flex-col gap-6">' + done.map(eventCard).join("") + "</div>" : "") +
        "</div>" +
        '<aside class="xl:col-span-4 flex flex-col gap-6">' + dueToday() + "</aside>" +
      "</div>";
  }

  function eventCard(e) {
    var m = money(e), d = daysTo(e.date), h = health(e), tab = e.completed && !e.closed ? "closeout" : "plan";
    var open = e.items.filter(function (i) { return i.status !== "confirmed"; }).length;
    var dot = { track: ["bg-outline-variant", "On track"], attention: ["bg-gold", "Needs attention"], closeout: ["bg-plum", "Close-out due"], closed: ["bg-outline", "Closed"] }[h];
    var href = "#event-" + e.id + "-" + tab;
    return '<article class="pr-card group ' + CARD + ' p-4 sm:p-5 flex flex-col sm:flex-row gap-5">' +
      '<a href="' + href + '" class="block shrink-0 overflow-hidden rounded-[18px] w-full sm:w-40 h-44 sm:h-40" tabindex="-1" aria-hidden="true">' + photo(e.img, "w-full h-full pr-zoom", "celebration", "") + "</a>" +
      '<div class="flex-1 min-w-0 flex flex-col gap-3 py-1">' +
        '<div class="flex flex-wrap items-center justify-between gap-2"><span class="text-[13px] font-semibold text-secondary">' + esc(TYPE_LABEL[e.type] || e.type) + (e.completed ? " · Finished " + fmtDate(e.date) : " · " + d + " days to go") + "</span>" +
          '<span class="inline-flex items-center gap-1.5 text-[13px] font-medium text-on-surface-variant"><span class="w-2 h-2 rounded-full ' + dot[0] + '"></span>' + dot[1] + "</span></div>" +
        '<div><h3 class="text-[24px] leading-tight font-bold tracking-[-0.025em] text-primary"><a href="' + href + '" class="hover:opacity-80 transition-opacity">' + esc(e.short) + '</a></h3><p class="text-[14px] text-on-surface-variant mt-1">' + fmtDate(e.date) + " · " + esc(e.venue) + "</p></div>" +
        '<div class="flex flex-col gap-1.5"><div class="w-full h-1.5 rounded-full bg-surface-container overflow-hidden"><div class="h-full rounded-full ' + (m.pct > 90 ? "bg-gold" : "bg-plum") + ' pr-bar" style="width:' + m.pct.toFixed(1) + '%"></div></div>' +
          '<div class="flex flex-wrap justify-between gap-2 text-[13px] text-outline tabular-nums"><span><b class="text-on-surface font-semibold">' + short(m.committed) + "</b> of " + short(e.budget) + " committed</span><span>" + open + " open items · " + e.guests + " guests</span></div></div>" +
        '<div class="flex flex-wrap items-center gap-2 mt-auto pt-1"><a class="' + BTN + '" href="' + href + '">' + (e.completed && !e.closed ? "Close out" : "Open workspace") + "</a>" +
          (true ? '<button class="pr-link" data-act="client-view" data-ev="' + e.id + '">Client view ' + ic("chevron_right", "text-[18px]") + "</button>" : "") + "</div>" +
      "</div></article>";
  }
  function dueToday() {
    var list = S.tasks.filter(function (t) { return t.due === "Today"; });
    var done = list.filter(function (t) { return t.done; }).length;
    return '<section class="' + CARD + ' p-6 flex flex-col gap-4"><div class="flex items-center justify-between"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-secondary-container/30 text-secondary flex items-center justify-center">' + ic("schedule", "", true) +
      '</div><div><h2 class="font-title-md text-title-md text-primary font-bold">Due Today</h2><p class="font-body-sm text-body-sm text-outline">' + done + " of " + list.length + ' done</p></div></div></div><div class="flex flex-col divide-y divide-surface-container">' +
      list.map(taskRow).join("") + '</div><a href="#tasks" class="font-label-md text-label-md text-primary font-semibold flex items-center gap-1 hover:underline">View all ' + S.tasks.length + " tasks" + ic("chevron_right", "text-title-md") + "</a></section>";
  }
  function taskRow(t) {
    var e = ev(t.event);
    return '<div class="flex gap-3 py-3"><input type="checkbox" class="mt-1 w-[18px] h-[18px] rounded border-outline-variant text-primary-container focus:ring-primary" data-act="task" data-id="' + t.id + '" aria-label="' + esc(t.text) + '"' + (t.done ? " checked" : "") + ">" +
      '<div class="flex flex-col gap-1 min-w-0"><a href="#' + t.go + '" class="font-body-sm text-body-sm font-semibold ' + (t.done ? "line-through text-outline" : "text-on-surface hover:text-primary") + '">' + esc(t.text) + "</a>" +
      '<div class="flex flex-wrap items-center gap-2">' + (t.pri ? '<span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-on-surface font-bold">' + t.pri + "</span>" : "") +
      '<span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-secondary-container/40 text-on-secondary-container font-semibold">' + esc(e.short) + '</span><span class="font-label-sm text-label-sm text-outline">' + (t.due === "Today" && t.time ? "Due " + t.time : t.due) + "</span></div></div></div>";
  }
  function viewTasks() {
    var evIds = S.tasks.map(function (x) { return x.event; }).filter(function (v, i, a) { return a.indexOf(v) === i && ev(v); });
    var list = S.tasks.filter(function (x) { return ui.taskEvent === "All" || x.event === ui.taskEvent; });
    var open = list.filter(function (x) { return !x.done; }), done = list.filter(function (x) { return x.done; });
    var chips = '<div class="flex items-center gap-1 overflow-x-auto" role="group" aria-label="Filter by event">' + [["All", "All events"]].concat(evIds.map(function (id) { return [id, ev(id).short]; })).map(function (c) {
      var n = c[0] === "All" ? S.tasks.filter(function (x) { return !x.done; }).length : S.tasks.filter(function (x) { return x.event === c[0] && !x.done; }).length;
      return '<button data-act="task-filter" data-id="' + c[0] + '" aria-pressed="' + (ui.taskEvent === c[0]) + '" class="' + (ui.taskEvent === c[0] ? PILL_ON : PILL_OFF) + '">' + esc(c[1]) + (n ? ' <span class="opacity-60">' + n + "</span>" : "") + "</button>";
    }).join("") + "</div>";
    return pageHead("", "Tasks", "Everything due across your events, soonest first.", "") + chips +
      '<section class="' + CARD + ' p-6 flex flex-col gap-2"><h2 class="text-[19px] font-bold tracking-[-0.02em] text-on-surface">Open <span class="text-outline font-medium">' + open.length + '</span></h2><div class="flex flex-col divide-y divide-surface-container">' + (open.length ? open.map(taskRow).join("") : '<p class="py-4 text-[14px] text-outline">Nothing open here.</p>') + "</div></section>" +
      (done.length ? '<section class="' + CARD + ' p-6 flex flex-col gap-2"><h2 class="text-[19px] font-bold tracking-[-0.02em] text-on-surface">Done <span class="text-outline font-medium">' + done.length + '</span></h2><div class="flex flex-col divide-y divide-surface-container">' + done.map(taskRow).join("") + "</div></section>" : "");
  }
  function viewClients() {
    return pageHead("", "Clients", "Invite each client to their portal, add family, and keep track of fees.", "") +
      '<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5" data-stagger>' + S.events.map(function (e) {
        var c = e.client, g = e.eng, tabHref = "#event-" + e.id + "-people";
        return '<article class="' + CARD + ' p-6 flex flex-col gap-4"><div class="flex items-start justify-between gap-3"><div class="flex items-center gap-3 min-w-0"><div class="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center text-on-surface font-semibold text-[13px] shrink-0">' + initials(c.name) + '</div>' +
          '<div class="min-w-0"><h3 class="text-[17px] font-semibold text-on-surface">' + esc(c.name) + '</h3><p class="text-[13px] text-outline truncate">' + esc(e.name) + "</p></div></div>" + inviteChip(c.invite === "none" ? "none" : c.invite) + "</div>" +
          '<dl class="grid grid-cols-3 gap-2 text-[13px]"><div><dt class="text-outline">Package</dt><dd class="font-semibold text-on-surface">' + esc(g.pkg) + '</dd></div><div><dt class="text-outline">Fee</dt><dd class="font-semibold text-on-surface tabular-nums">' + short(g.fee) + '</dd></div><div><dt class="text-outline">Payment</dt><dd class="font-semibold text-on-surface">' + payState(g) + "</dd></div></dl>" +
          '<p class="text-[13px] text-outline">' + (e.members.length ? e.members.length + " family member" + (e.members.length > 1 ? "s" : "") + " · " + e.members.map(function (m) { return esc(m.name.split(" ")[0]); }).join(", ") : "No family added") + "</p>" +
          '<div class="flex flex-wrap gap-2 mt-auto">' + (c.invite === "none" ? '<button class="' + BTN + '" data-act="invite-client" data-ev="' + e.id + '">Send invite</button>' : c.invite === "sent" ? '<button class="' + BTN_SOFT + '" data-act="invite-client" data-ev="' + e.id + '">Resend invite</button>' : '<button class="' + BTN_SOFT + '" data-act="client-view" data-ev="' + e.id + '">Open portal</button>') +
          '<a class="' + BTN_SOFT + '" href="' + tabHref + '">Manage</a></div></article>';
      }).join("") + "</div>";
  }
  // ---------- Workspace ----------

  function viewWorkspace(e, tab) {
    var m = money(e), d = daysTo(e.date);
    var openA = S.approvals.filter(function (a) { return a.event === e.id && a.status !== "approved"; }).length;
    var tabs = [["plan", "Planning sheet"], ["guests", "Guests"], ["approvals", "Approvals"], ["people", "People"], ["notes", "Notes"]];
    if (e.completed) tabs.push(["closeout", "Close-out"]);
    var milestone = Math.round(m.confirmed / m.total * 100);
    var hero = '<section class="relative rounded-[28px] overflow-hidden h-[420px] sm:h-[360px] pr-soft">' + photo(e.img, "absolute inset-0 w-full h-full pr-kenburns", "celebration", "") +
      '<div class="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/35 to-[#000000]/5"></div>' +
      '<a href="#events" class="absolute top-4 left-4 pr-glass-dark inline-flex items-center gap-1 text-white text-[13px] font-semibold pl-2 pr-3.5 py-1.5 rounded-full">' + ic("chevron_left", "text-[18px]") + "All events</a>" +
      '<div class="absolute inset-x-0 bottom-0 p-6 sm:p-10 flex flex-wrap items-end justify-between gap-5">' +
        '<div class="flex flex-col gap-2 min-w-0"><span class="text-[15px] font-semibold text-gold">' + esc(TYPE_LABEL[e.type] || e.type) + (e.completed ? " · Concluded" : " · " + d + " days to go") + "</span>" +
          '<h1 class="pr-display text-white">' + esc(e.name) + "</h1>" +
          '<p class="text-[15px] text-white/80">' + weekday(e.date) + ", " + fmtDate(e.date, true) + " · " + esc(e.venue) + "</p></div>" +
        '<div class="flex flex-wrap gap-2">' + (true ? '<button data-ev="' + e.id + '" class="pr-btn inline-flex items-center gap-1.5 border-[1.5px] border-white/60 text-white hover:border-white text-[14px] font-semibold px-5 py-2 rounded-full" data-act="client-view">' + ic("smartphone", "text-[18px]") + "Client view</button>" : "") +
          (tab === "plan" && !e.closed ? '<button class="pr-btn inline-flex items-center gap-1.5 border-[1.5px] border-white text-white hover:bg-white hover:text-on-surface text-[14px] font-semibold px-5 py-2 rounded-full" data-act="add-item">' + ic("add", "text-[18px]") + "Add item</button>" : "") + "</div></div></section>";
    var local = '<div class="sticky top-[136px] lg:top-24 z-30 flex justify-center"><nav class="pr-glass pr-soft inline-flex items-center gap-1 p-1 rounded-full max-w-full overflow-x-auto" aria-label="Event sections">' + tabs.map(function (t) {
        var on = tab === t[0];
        return '<a href="#event-' + e.id + "-" + t[0] + '" class="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-[14px] font-semibold whitespace-nowrap transition-all ' + (on ? "bg-surface-container-lowest text-on-surface shadow-[0_1px_3px_rgba(0,0,0,0.12)]" : "text-on-surface-variant hover:text-on-surface") + '"' + (on ? ' aria-current="page"' : "") + ">" + t[1] +
          (t[0] === "approvals" && openA ? '<span class="min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-bold flex items-center justify-center ' + "bg-primary-container text-white" + '">' + openA + "</span>" : "") + "</a>";
      }).join("") + "</nav></div>";
    var facts = '<div class="' + CARD + ' grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-surface-container overflow-hidden">' +
      metric("groups", "Guests", e.guests + (e.vip ? " · " + e.vip + " VIP" : "")) + metric("assignment_ind", "Lead planner", PLANNER.name) + metric("person", "Client", e.client.name) +
      '<div class="p-5 flex flex-col gap-2"><span class="text-[12px] text-outline font-medium">Bookings confirmed</span><span class="text-[17px] font-semibold text-on-surface tabular-nums">' + m.confirmed + " of " + m.total + '</span><div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden"><div class="bg-plum h-full rounded-full pr-bar" style="width:' + milestone + '%"></div></div></div></div>';
    var body = tab === "people" ? tabPeople(e) : tab === "notes" ? tabNotes(e) : tab === "guests" ? tabGuests(e) : tab === "approvals" ? tabApprovals(e) : tab === "closeout" && e.completed ? tabCloseout(e) : tabPlan(e, m);
    return hero + local + (tab === "plan" ? facts : "") + body;
  }

  function tabPeople(e) {
    var c = e.client, g = e.eng, bal = Math.max(0, g.fee - g.paid);
    var clientActions = (c.invite === "none" ? '<button class="' + BTN + '" data-act="invite-client" data-ev="' + e.id + '">' + ic("send", "text-[18px]") + "Send invite</button>" : c.invite === "sent" ? '<button class="' + BTN_SOFT + '" data-act="invite-client" data-ev="' + e.id + '">' + ic("refresh", "text-[18px]") + "Resend invite</button>" : "") +
      '<button class="' + BTN_SOFT + '" data-act="copy" data-id="' + portalLink(e) + '">' + ic("link", "text-[18px]") + "Copy portal link</button>" +
      '<button class="' + BTN_SOFT + '" data-act="client-view" data-ev="' + e.id + '"' + (c.invite === "accepted" ? "" : ' data-welcome="1"') + ">" + ic("smartphone", "text-[18px]") + (c.invite === "accepted" ? "Preview portal" : "Preview invite") + "</button>";
    var members = e.members.length ? e.members.map(function (m) {
      return '<div class="flex flex-wrap items-center gap-3 py-4"><div class="w-10 h-10 rounded-full bg-surface-container text-on-surface font-semibold text-[13px] flex items-center justify-center shrink-0">' + initials(m.name) + '</div>' +
        '<div class="flex flex-col min-w-0 flex-1"><span class="text-[15px] font-semibold text-on-surface">' + esc(m.name) + '</span><span class="text-[13px] text-outline">' + esc(m.rel) + " · " + esc(m.phone) + "</span></div>" +
        '<label class="sr-only" for="role-' + m.id + '">Role for ' + esc(m.name) + '</label><select id="role-' + m.id + '" data-act="member-role" data-ev="' + e.id + '" data-id="' + m.id + '" class="h-9 pl-3 pr-8 bg-surface-container-low border-0 rounded-full text-[13px] font-medium focus:ring-2 focus:ring-plum/30"><option value="approver"' + (m.role === "approver" ? " selected" : "") + '>Can approve</option><option value="viewer"' + (m.role === "viewer" ? " selected" : "") + ">View only</option></select>" +
        inviteChip(m.status) +
        (m.status !== "accepted" ? '<button class="pr-link" data-act="member-resend" data-ev="' + e.id + '" data-id="' + m.id + '">Resend</button>' : "") +
        '<button class="w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center text-outline" data-act="member-remove" data-ev="' + e.id + '" data-id="' + m.id + '" aria-label="Remove ' + esc(m.name) + '">' + ic("close", "text-[18px]") + "</button></div>";
    }).join("") : '<p class="py-4 text-[14px] text-outline">No one else yet. Add the partner or family who should follow along.</p>';
    return '<div class="grid grid-cols-1 xl:grid-cols-12 gap-space-xl items-start"><div class="min-w-0 xl:col-span-8 flex flex-col gap-space-lg">' +
      '<section class="' + CARD + ' p-6 flex flex-col gap-5"><div class="flex flex-wrap items-start justify-between gap-3"><div><span class="text-[13px] text-outline font-medium">Client</span><h2 class="text-[22px] font-bold tracking-[-0.02em] text-on-surface">' + esc(c.name) + '</h2><p class="text-[14px] text-on-surface-variant">' + esc(c.phone) + " · Host, can approve</p></div>" + inviteChip(c.invite === "none" ? "none" : c.invite) + "</div>" +
        '<div class="flex flex-col gap-1.5"><span class="' + LABEL + '">' + (c.invite === "none" ? "Invite message" : "Invite sent " + esc(c.sent) + " on WhatsApp") + '</span><div class="bg-surface-container-low rounded-2xl rounded-tl-md p-4 text-[14px] text-on-surface max-w-xl">' + esc(inviteText(e, c.name)) + "</div></div>" +
        '<div class="flex flex-wrap gap-2">' + clientActions + "</div></section>" +
      '<section class="' + CARD + ' p-6 flex flex-col"><div class="flex items-center justify-between gap-3"><div><h2 class="text-[19px] font-bold tracking-[-0.02em] text-on-surface">Family &amp; collaborators</h2><p class="text-[13px] text-outline">People who can follow the plan. Only those who can approve answer decisions.</p></div></div>' +
        '<div class="flex flex-col divide-y divide-surface-container">' + members + "</div>" +
        '<form id="member-form" data-ev="' + e.id + '" class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-surface-container" novalidate><h3 class="sm:col-span-2 text-[15px] font-semibold text-on-surface">Add someone</h3>' +
          '<div class="flex flex-col gap-1"><label for="mb-name" class="' + LABEL + '">Name</label><input id="mb-name" class="' + INPUT + '" placeholder="e.g. Tunde Bakare"></div>' +
          '<div class="flex flex-col gap-1"><label for="mb-rel" class="' + LABEL + '">Relationship</label><input id="mb-rel" class="' + INPUT + '" placeholder="e.g. Groom, Bride\'s sister"></div>' +
          '<div class="flex flex-col gap-1"><label for="mb-phone" class="' + LABEL + '">WhatsApp number</label><input id="mb-phone" type="tel" class="' + INPUT + '" placeholder="+234 …"></div>' +
          '<div class="flex flex-col gap-1"><label for="mb-role" class="' + LABEL + '">Access</label><select id="mb-role" class="' + INPUT + '"><option value="viewer">View only</option><option value="approver">Can approve</option></select></div>' +
          '<p id="mb-err" role="alert" class="sm:col-span-2 text-[13px] text-error"></p><div class="sm:col-span-2"><button type="submit" class="' + BTN + '">' + ic("person_add", "text-[18px]") + "Send invite</button></div></form></section>" +
      '</div><aside class="min-w-0 xl:col-span-4 flex flex-col gap-space-lg"><section class="' + CARD + ' p-6 flex flex-col gap-4"><div class="flex items-center justify-between"><h2 class="text-[19px] font-bold tracking-[-0.02em] text-on-surface">Engagement</h2><span class="text-[13px] font-medium text-on-surface-variant">' + payState(g) + "</span></div>" +
        '<div class="flex flex-col gap-1"><label for="eng-pkg" class="' + LABEL + '">Package</label><select id="eng-pkg" data-act="eng-pkg" data-ev="' + e.id + '" class="' + INPUT + '">' + PKGS.map(function (p) { return "<option" + (p === g.pkg ? " selected" : "") + ">" + p + "</option>"; }).join("") + "</select></div>" +
        '<div class="flex flex-col gap-1"><label for="eng-fee" class="' + LABEL + '">Planning fee (₦)</label><input id="eng-fee" type="number" min="0" inputmode="numeric" data-input="eng-fee" data-ev="' + e.id + '" class="' + INPUT + ' tabular-nums" value="' + g.fee + '"></div>' +
        '<div class="grid grid-cols-2 gap-3"><div class="bg-surface-container-low rounded-2xl p-4"><span class="' + LABEL + '">Paid</span><div class="text-[17px] font-semibold tabular-nums">' + naira(g.paid) + '</div></div><div class="bg-surface-container-low rounded-2xl p-4"><span class="' + LABEL + '">Balance</span><div class="text-[17px] font-semibold tabular-nums">' + naira(bal) + "</div></div></div>" +
        '<div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden"><div class="h-full bg-plum rounded-full" style="width:' + (g.fee ? Math.min(100, g.paid / g.fee * 100) : 0).toFixed(1) + '%"></div></div>' +
        '<form id="pay-form" data-ev="' + e.id + '" class="flex gap-2 items-end" novalidate><div class="flex flex-col gap-1 flex-1 min-w-0"><label for="pay-amt" class="' + LABEL + '">Record a payment (₦)</label><input id="pay-amt" type="number" min="1" inputmode="numeric" class="' + INPUT + ' tabular-nums" placeholder="' + (bal || 0) + '"></div><button type="submit" class="' + BTN_SOFT + ' h-11">Record</button></form>' +
        '<p class="text-[12px] text-outline">Vendor commission is tracked separately on each booking.</p></section></aside></div>';
  }
  function tabNotes(e) {
    return '<section class="' + CARD + ' p-6 flex flex-col gap-4 max-w-3xl"><div class="flex items-center gap-2 text-[13px] text-on-surface-variant font-medium">' + ic("lock", "text-[18px]") + "Only Party Riders planners see these notes. Clients, family and vendors never do.</div>" +
      '<form id="note-form" data-ev="' + e.id + '" class="flex flex-col gap-2" novalidate><label for="note-text" class="sr-only">New note</label><textarea id="note-text" rows="3" class="w-full p-4 bg-surface-container-low border-0 rounded-2xl text-[15px] focus:outline-none focus:ring-2 focus:ring-plum/30" placeholder="Add a note for the team, e.g. who prefers what, venue rules, family sensitivities"></textarea><div><button type="submit" class="' + BTN + '">' + ic("note_add", "text-[18px]") + "Add note</button></div></form>" +
      '<div class="flex flex-col divide-y divide-surface-container">' + (e.notes.length ? e.notes.map(function (n) {
        return '<div class="py-4 flex gap-3"><div class="w-8 h-8 rounded-full bg-surface-container text-[12px] font-semibold flex items-center justify-center shrink-0">AB</div><div class="flex-1 min-w-0"><div class="text-[13px] text-outline">' + PLANNER.name + " · " + esc(n.when) + '</div><p class="text-[15px] text-on-surface whitespace-pre-line">' + esc(n.text) + '</p></div><button class="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-outline self-start" data-act="note-delete" data-ev="' + e.id + '" data-id="' + n.id + '" aria-label="Delete note">' + ic("delete", "text-[18px]") + "</button></div>";
      }).join("") : '<p class="py-4 text-[14px] text-outline">No notes yet.</p>') + "</div></section>";
  }
  function metric(icon, label, value) {
    return '<div class="p-5 flex flex-col gap-1 min-w-0"><span class="text-[12px] text-outline font-medium flex items-center gap-1">' + ic(icon, "text-[16px] text-secondary") + label + '</span><span class="text-[17px] font-semibold text-on-surface truncate">' + esc(value) + "</span></div>";
  }
  function tabPlan(e, m) {
    var cats = ["All"].concat(e.items.map(function (i) { return i.cat; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
    var q = ui.itemQuery.toLowerCase();
    var rows = e.items.filter(function (i) { return (ui.itemCat === "All" || i.cat === ui.itemCat) && (!q || (i.cat + " " + i.name + " " + vendorName(i)).toLowerCase().indexOf(q) >= 0); });
    var vendorsConfirmed = e.items.filter(function (i) { return i.status === "confirmed"; }).length;
    var alloc = {};
    e.items.forEach(function (i) { alloc[i.cat] = (alloc[i.cat] || 0) + i.est; });
    var allocRows = Object.keys(alloc).sort(function (a, b) { return alloc[b] - alloc[a]; }).slice(0, 5);
    var pendingAmt = e.items.filter(function (i) { return i.status === "pending"; }).reduce(function (s, i) { return s + i.est; }, 0);
    var pPct = Math.min(100 - m.pct, pendingAmt / e.budget * 100);
    return '<div class="grid grid-cols-1 xl:grid-cols-12 gap-space-xl items-start"><section class="min-w-0 xl:col-span-8 flex flex-col gap-space-lg">' +
      '<div class="' + CARD + ' p-space-md flex flex-col gap-space-sm"><div class="relative">' + ic("filter_alt", "absolute left-3 top-2.5 text-outline text-headline-sm") +
        '<label for="item-q" class="sr-only">Search line items</label><input id="item-q" data-input="item-q" class="w-full h-10 pl-10 pr-space-md bg-surface-container-low border-0 rounded-xl font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" placeholder="Search line items or vendors" value="' + esc(ui.itemQuery) + '"></div>' +
        '<div class="flex items-center gap-space-xs overflow-x-auto pb-1" role="group" aria-label="Category">' + cats.map(function (c) {
          return '<button data-act="item-cat" data-id="' + esc(c) + '" aria-pressed="' + (ui.itemCat === c) + '" class="' + (ui.itemCat === c ? PILL_ON : PILL_OFF) + '">' + (c === "All" ? "All items (" + e.items.length + ")" : esc(c)) + "</button>";
        }).join("") + "</div></div>" +
      '<div class="' + CARD + ' overflow-hidden flex flex-col"><div class="relative overflow-x-auto w-full"><table class="w-full text-left border-collapse table-auto min-w-[720px]"><thead><tr class="text-outline text-[12px] font-medium border-b border-surface-container">' +
        '<th class="py-space-md px-space-md font-semibold w-[120px]">Category</th><th class="py-space-md px-space-md font-semibold">Item / Deliverable</th><th class="py-space-md px-space-md font-semibold">Assigned Vendor</th><th class="py-space-md px-space-md font-semibold text-right">Est. / Actual</th><th class="py-space-md px-space-md font-semibold text-center">Status</th><th class="py-space-md px-space-md w-[50px]"><span class="sr-only">Open</span></th></tr></thead>' +
        '<tbody class="divide-y divide-surface-container">' + (rows.length ? rows.map(function (i) {
          var a = apprFor(i.id), vn = vendorName(i);
          var vendorCell = vn ? '<div class="flex items-start gap-space-sm"><div class="w-8 h-8 rounded-full bg-surface-container flex-shrink-0 flex items-center justify-center text-primary font-bold text-label-sm">' + initials(vn) + '</div><div class="flex flex-col gap-0.5"><span class="font-body-sm text-body-sm font-semibold text-on-surface leading-tight">' + esc(vn) + '</span><span class="font-label-sm text-label-sm font-medium ' + (i.status === "confirmed" ? "text-tertiary" : "text-secondary") + '">' + (i.status === "confirmed" ? "Contract signed" : "Quote received") + "</span></div></div>"
            : a ? '<div class="flex items-start gap-space-sm"><div class="w-8 h-8 rounded-full bg-primary-fixed/60 flex-shrink-0 flex items-center justify-center text-primary-container">' + ic("how_to_vote", "text-[18px]") + '</div><div class="flex flex-col gap-0.5"><span class="font-body-sm text-body-sm font-semibold text-on-surface leading-tight">' + a.options.length + " shortlisted</span><span class=\"font-label-sm text-label-sm font-medium text-primary-container\">" + (a.status === "sent" ? "Awaiting " + esc(e.client.short) : "Draft · not sent") + "</span></div></div>"
            : '<button class="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-semibold hover:underline" data-act="edit-item" data-id="' + i.id + '">' + ic("person_search", "text-title-md") + "Find vendor</button>";
          return '<tr class="hover:bg-surface-container-low/40 transition-colors cursor-pointer" data-act="edit-item" data-id="' + i.id + '" tabindex="0" aria-label="Open ' + esc(i.cat) + '">' +
            '<td class="py-5 px-space-md align-top"><span class="inline-flex items-center gap-1 text-[13px] font-medium text-on-surface-variant">' + ic(CAT_ICON[i.cat] || "category", "text-[14px]") + esc(i.cat) + "</span></td>" +
            '<td class="py-5 px-space-md align-top"><span class="font-title-md text-title-md font-semibold text-on-surface leading-snug">' + esc(i.name) + "</span></td>" +
            '<td class="py-5 px-space-md align-top">' + vendorCell + "</td>" +
            '<td class="py-5 px-space-md align-top text-right"><div class="flex flex-col items-end gap-0.5"><span class="font-currency-md text-currency-md font-bold text-primary leading-tight tabular-nums">' + naira(i.actual != null ? i.actual : i.est) + '</span><span class="font-body-sm text-body-sm text-outline tabular-nums">' + (i.actual != null ? "Est: " + naira(i.est) : "Estimate") + "</span></div></td>" +
            '<td class="py-5 px-space-md align-top text-center">' + statusChip(i) + "</td>" +
            '<td class="py-5 px-space-md align-top text-right text-outline">' + ic("chevron_right", "text-headline-sm") + "</td></tr>";
        }).join("") : '<tr><td colspan="6" class="py-space-2xl text-center font-body-sm text-body-sm text-outline">No items match this filter.</td></tr>') + "</tbody></table></div>" +
        '<div class="flex flex-wrap items-center justify-between gap-2 px-space-md py-space-md bg-surface-container-low/50 border-t border-surface-container"><span class="font-body-sm text-body-sm text-on-surface-variant">' + e.items.length + " items · " + vendorsConfirmed + " confirmed contracts</span>" +
          (e.closed ? "" : '<button class="font-label-md text-label-md text-primary font-semibold flex items-center gap-1 hover:underline" data-act="add-item">' + ic("add", "text-title-md") + "Quick add line item</button>") + "</div></div>" +
      "</section>" +
      '<aside class="min-w-0 xl:col-span-4 flex flex-col gap-space-xl"><div class="' + CARD + ' p-space-xl flex flex-col gap-space-xl">' +
        '<div class="flex items-center justify-between pb-space-xs border-b border-surface-container"><div class="flex items-center gap-space-xs">' + ic("monetization_on", "text-headline-sm text-secondary") + '<h3 class="font-title-md text-title-md font-bold text-primary">Budget &amp; Cashflow</h3></div><span class="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-bold">' + Math.round(m.pct) + "% committed</span></div>" +
        '<div class="flex flex-col gap-space-md"><div class="flex flex-col"><span class="' + LABEL + '">Total approved budget</span><span class="font-currency-display text-currency-display text-primary font-bold mt-1 tabular-nums">' + naira(e.budget) + "</span></div>" +
          budgetBox("Committed", vendorsConfirmed + " of " + m.total + " vendors", naira(m.committed), Math.round(m.pct) + "% of total", "text-primary", "text-tertiary") +
          budgetBox("Remaining balance", m.est > e.budget ? "Plan is " + short(m.est - e.budget) + " over" : "Plan fits the budget", naira(m.remaining), Math.round(100 - m.pct) + "% unallocated", "text-secondary", m.est > e.budget ? "text-error" : "text-on-surface-variant") +
          '<div class="flex flex-col gap-2 pt-1"><div class="w-full bg-surface-container rounded-full h-3 flex overflow-hidden"><div class="bg-plum h-full" style="width:' + m.pct.toFixed(1) + '%"></div><div class="bg-gold h-full" style="width:' + pPct.toFixed(1) + '%"></div></div>' +
          '<div class="flex items-center justify-between text-label-sm font-label-sm text-outline pt-0.5"><span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-plum inline-block"></span>Committed</span><span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-gold inline-block"></span>Pending</span><span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-surface-dim inline-block"></span>Buffer</span></div></div></div>' +
        '<div class="pt-space-md border-t border-surface-container flex flex-col gap-space-md"><h4 class="font-label-md text-label-md font-bold text-on-surface">Category allocation</h4>' + allocRows.map(function (c) {
          var p = alloc[c] / e.budget * 100;
          return '<div class="flex flex-col gap-1"><div class="flex justify-between font-body-sm text-body-sm"><span class="text-on-surface font-medium">' + esc(c) + '</span><span class="text-outline tabular-nums">' + short(alloc[c]) + " · " + Math.round(p) + '%</span></div><div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden"><div class="h-full bg-primary-container rounded-full" style="width:' + Math.min(100, p).toFixed(1) + '%"></div></div></div>';
        }).join("") + "</div></div></aside></div>";
  }
  function budgetBox(label, sub, value, foot, valCls, subCls) {
    return '<div class="bg-surface-container-low rounded-xl p-space-md flex items-center justify-between gap-space-md w-full min-w-0"><div class="flex flex-col gap-0.5 min-w-0"><span class="font-label-sm text-label-sm text-outline font-semibold">' + label + '</span><span class="text-label-sm font-semibold ' + subCls + '">' + sub + '</span></div><div class="flex flex-col items-end flex-shrink-0 text-right"><span class="font-currency-md text-currency-md font-bold tabular-nums ' + valCls + '">' + value + '</span><span class="font-label-sm text-label-sm text-outline">' + foot + "</span></div></div>";
  }

  function tabGuests(e) {
    if (e.id !== "adaeze") return '<div class="' + CARD + ' p-space-2xl flex flex-col items-center gap-space-sm text-center">' + ic("mail", "text-[40px] text-outline-variant") + '<h3 class="font-title-md text-title-md text-on-surface">Invitations haven\'t gone out yet</h3><p class="font-body-sm text-body-sm text-outline">The guest list opens here once ' + esc(e.client.short) + " shares it.</p></div>";
    var g = S.guests, st = g.stats, q = ui.guestQuery.toLowerCase();
    var rows = g.rows.filter(function (r) { return (ui.guestFilter === "all" || r[4] === ui.guestFilter) && (!q || (r[0] + r[1] + r[3]).toLowerCase().indexOf(q) >= 0); });
    var R = { attending: ["text-on-surface-variant", "check_circle", "Attending"], pending: ["text-on-surface-variant", "schedule", "Pending"], declined: ["text-on-surface-variant", "cancel", "Declined"] };
    var A = { paid: ["text-tertiary", "Paid"], unpaid: ["text-secondary", "Awaiting payment"], none: ["text-outline", "Not ordered"] };
    return '<section class="grid grid-cols-2 xl:grid-cols-4 gap-5">' +
        statTile("mail", "bg-surface-container text-primary", "Invited", st.invited, "") + statTile("how_to_reg", "bg-tertiary-fixed/50 text-tertiary-container", "Attending", st.attending, Math.round(st.attending / st.invited * 100) + "%") +
        statTile("schedule", "bg-secondary-container/30 text-secondary", "Pending", st.pending, "") + statTile("event_busy", "", "Declined", st.declined, "") + "</section>" +
      '<div class="' + CARD + ' p-space-md flex flex-wrap items-center justify-between gap-space-sm"><div class="flex items-center gap-space-xs overflow-x-auto" role="group" aria-label="RSVP">' +
        [["all", "All guests"], ["attending", "Attending"], ["pending", "Pending"], ["declined", "Declined"]].map(function (f) { return '<button data-act="guest-filter" data-id="' + f[0] + '" aria-pressed="' + (ui.guestFilter === f[0]) + '" class="' + (ui.guestFilter === f[0] ? PILL_ON : PILL_OFF) + '">' + f[1] + "</button>"; }).join("") + "</div>" +
        '<div class="flex flex-wrap items-center gap-space-sm"><div class="relative">' + ic("search", "absolute left-3 top-2.5 text-outline text-headline-sm") + '<label for="guest-q" class="sr-only">Search guests</label><input id="guest-q" data-input="guest-q" class="h-10 pl-10 pr-space-md bg-surface-container-low border-0 rounded-xl font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary w-56" placeholder="Search name, phone or table" value="' + esc(ui.guestQuery) + '"></div>' +
        '<button class="' + BTN_SOFT + '" data-act="preview-rsvp">' + ic("visibility", "text-title-md") + "Preview invitation</button>" +
        (g.reminded ? '<button class="' + BTN + '" disabled>' + ic("done_all", "text-title-md") + "Reminded today</button>" : '<button class="' + BTN + '" data-act="remind">' + ic("chat", "text-title-md") + "Send WhatsApp reminders (" + st.pending + ")</button>") + "</div></div>" +
      '<div class="' + CARD + ' overflow-hidden"><div class="relative overflow-x-auto"><table class="w-full text-left border-collapse min-w-[760px]"><thead><tr class="text-outline text-[12px] font-medium border-b border-surface-container"><th class="py-space-md px-space-md font-semibold">Guest &amp; contact</th><th class="py-space-md px-space-md font-semibold">Side</th><th class="py-space-md px-space-md font-semibold">Table</th><th class="py-space-md px-space-md font-semibold">RSVP</th><th class="py-space-md px-space-md font-semibold">Aso Ebi</th></tr></thead><tbody class="divide-y divide-surface-container">' +
      (rows.length ? rows.map(function (r) {
        return '<tr class="hover:bg-surface-container-low/40"><td class="py-4 px-space-md"><div class="flex items-center gap-space-sm"><div class="w-9 h-9 rounded-full ' + (/VIP/.test(r[2]) ? "bg-secondary-container text-on-secondary-container" : "bg-surface-container text-primary") + ' flex items-center justify-center font-bold text-label-sm">' + initials(r[0]) + '</div><div class="flex flex-col"><span class="font-body-sm text-body-sm font-semibold text-on-surface">' + esc(r[0]) + '</span><span class="font-label-sm text-label-sm text-outline tabular-nums">' + r[1] + "</span></div></div></td>" +
          '<td class="py-4 px-space-md"><span class="font-label-sm text-label-sm px-2 py-1 rounded-full font-bold ' + (/Bride/.test(r[2]) ? "bg-primary-fixed/50 text-primary-container" : /Groom/.test(r[2]) ? "bg-surface-container text-on-surface-variant" : "bg-secondary-container/50 text-on-secondary-container") + '">' + esc(r[2]) + "</span></td>" +
          '<td class="py-4 px-space-md font-body-sm text-body-sm text-on-surface">' + esc(r[3]) + "</td>" +
          '<td class="py-4 px-space-md"><span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-label-sm font-label-sm font-bold ' + R[r[4]][0] + '">' + ic(R[r[4]][1], "text-[14px]") + R[r[4]][2] + "</span></td>" +
          '<td class="py-4 px-space-md font-body-sm text-body-sm font-semibold ' + A[r[5]][0] + '">' + A[r[5]][1] + "</td></tr>";
      }).join("") : '<tr><td colspan="5" class="py-space-2xl text-center font-body-sm text-body-sm text-outline">No guests match.</td></tr>') +
      '</tbody></table></div><div class="px-space-md py-space-md bg-surface-container-low/50 border-t border-surface-container font-body-sm text-body-sm text-on-surface-variant">Showing ' + rows.length + " of " + st.invited + " guests</div></div>";
  }

  function tabApprovals(e) {
    var list = S.approvals.filter(function (a) { return a.event === e.id; });
    if (!list.length) return '<div class="' + CARD + ' p-space-2xl flex flex-col items-center gap-space-sm text-center">' + ic("task_alt", "text-[40px] text-outline-variant") + '<h3 class="font-title-md text-title-md text-on-surface">No decisions yet</h3><p class="font-body-sm text-body-sm text-outline max-w-md">Open any planning item, shortlist vendors with <b>Find vendor</b>, and send them to ' + esc(e.client.short) + " to approve.</p>" + '<a class="' + BTN + ' mt-2" href="#event-' + e.id + '-plan">Go to planning sheet</a></div>';
    var order = { draft: 0, sent: 1, approved: 2 };
    return '<div class="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">' + list.slice().sort(function (a, b) { return order[a.status] - order[b.status]; }).map(function (a) {
      var it = itemOf(e, a.item);
      var st = a.status === "draft" ? ["bg-secondary-fixed text-on-secondary-fixed-variant", "Draft · not sent"] : a.status === "sent" ? ["bg-primary-fixed text-on-primary-fixed-variant", "Awaiting " + e.client.short] : ["bg-tertiary-fixed text-tertiary-container", "Approved"];
      var opts = a.options.map(function (o, idx) {
        var v = vendor(o.vendor), chosen = a.chosen === idx;
        return '<div class="flex items-center justify-between gap-space-sm px-space-md py-space-sm rounded-lg ' + (chosen ? "bg-tertiary-fixed/40" : "bg-surface-container-low") + '"><div class="flex items-center gap-space-sm min-w-0"><span class="font-label-sm text-label-sm font-bold text-outline">' + String.fromCharCode(65 + idx) + '</span><span class="font-body-sm text-body-sm font-semibold text-on-surface truncate">' + esc(v.name) + "</span>" + (a.rec === idx && a.status !== "approved" ? '<span class="font-label-sm text-label-sm text-secondary font-bold">★ Pick</span>' : "") + (chosen ? ic("check_circle", "text-tertiary text-title-md", true) : "") + '</div><span class="font-label-md text-label-md text-primary font-bold tabular-nums">' + naira(o.price) + "</span></div>";
      }).join("");
      return '<article class="' + CARD + ' p-space-lg flex flex-col gap-space-md"><div class="flex items-start justify-between gap-space-sm"><div><span class="font-label-sm text-label-sm text-secondary font-bold">' + esc(it.cat) + '</span><h3 class="font-headline-sm text-headline-sm text-primary font-bold">' + esc(it.name) + '</h3></div><span class="font-label-sm text-label-sm px-2.5 py-1 rounded-full font-bold whitespace-nowrap ' + st[0] + '">' + st[1] + "</span></div>" +
        '<div class="flex flex-col gap-space-xs">' + opts + "</div>" +
        '<div class="flex flex-wrap gap-space-sm justify-end">' + (a.status === "draft" ? '<a class="' + BTN + '" href="#send-' + e.id + "-" + it.id + '">' + ic("outgoing_mail", "text-title-md") + "Review &amp; send</a>"
          : a.status === "sent" ? '<button class="' + BTN_SOFT + '" data-act="client-view" data-id="' + a.id + '">' + ic("smartphone", "text-title-md") + "See what " + esc(e.client.short) + " sees</button>"
          : '<span class="font-body-sm text-body-sm text-on-surface-variant">' + esc(e.client.short) + " chose " + esc(vendor(a.options[a.chosen].vendor).name) + ". The planning sheet is updated.</span>") + "</div></article>";
    }).join("") + "</div>";
  }

  // ---------- Send approval request (Stitch screen) ----------
  function viewSend(e, it) {
    var a = apprFor(it.id);
    if (!a) return '<div class="' + CARD + ' p-space-2xl text-center flex flex-col items-center gap-space-sm">' + ic("task_alt", "text-[40px] text-outline-variant") + '<h2 class="font-title-md text-title-md">Nothing to send for this item</h2><a class="' + BTN + '" href="#event-' + e.id + '-plan">Back to planning sheet</a></div>';
    var sent = a.status === "sent";
    var cards = a.options.map(function (o, idx) {
      var v = vendor(o.vendor), rec = a.rec === idx, perGuest = Math.round(o.price / e.guests);
      var pts = o.points || v.points;
      return '<article class="' + CARD + ' overflow-hidden flex flex-col border-2 ' + (rec ? "border-primary-container" : "border-transparent") + '">' +
        '<div class="relative h-36">' + photo(o.img || v.img, "absolute inset-0 w-full h-full", CAT_ICON[v.cat], v.name) + '<div class="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent"></div>' +
          '<span class="absolute top-3 left-3 font-label-sm text-label-sm px-2.5 py-1 rounded-full font-bold ' + (rec ? "bg-gold text-white" : "bg-surface-container-lowest/90 text-on-surface-variant") + '">' + (rec ? "★ Recommended" : "Alternative") + "</span>" +
          '<div class="absolute bottom-3 left-4 right-4"><h3 class="font-title-md text-title-md text-on-primary font-bold">' + esc(v.name) + '</h3><p class="font-body-sm text-body-sm text-on-primary/80">' + esc(v.area) + " · ★ " + v.rating + "</p></div></div>" +
        '<div class="p-space-md flex flex-col gap-space-md flex-1"><div class="flex items-end justify-between gap-space-sm border-b border-surface-container pb-space-sm"><div class="flex flex-col"><label for="q-' + idx + '" class="' + LABEL + '">Total quote</label>' +
          (sent ? '<span class="font-currency-md text-currency-md text-primary font-bold tabular-nums">' + naira(o.price) + "</span>" : '<div class="flex items-center gap-1 font-currency-md text-currency-md text-primary font-bold">₦<input id="q-' + idx + '" type="number" min="0" inputmode="numeric" data-input="quote" data-id="' + a.id + '" data-idx="' + idx + '" class="w-36 p-0 border-0 border-b border-dashed border-outline-variant bg-transparent font-currency-md text-currency-md text-primary font-bold focus:ring-0 focus:border-primary tabular-nums" value="' + o.price + '"></div>') +
          '</div><div class="flex flex-col items-end"><span class="' + LABEL + '">Per guest</span><span class="font-title-md text-title-md text-on-surface font-semibold tabular-nums">' + naira(perGuest) + "</span></div></div>" +
          '<ul class="flex flex-col gap-1.5">' + pts.map(function (p) { return '<li class="flex gap-2 font-body-sm text-body-sm text-on-surface-variant">' + ic("check", "text-[16px] text-tertiary") + esc(p) + "</li>"; }).join("") + "</ul>" +
          (sent ? "" : '<label class="mt-auto flex items-center gap-2 font-label-md text-label-md text-on-surface cursor-pointer"><input type="radio" name="rec" class="text-primary-container focus:ring-primary" data-act="set-rec" data-id="' + a.id + '" data-idx="' + idx + '"' + (rec ? " checked" : "") + "> Recommend option " + String.fromCharCode(65 + idx) + "</label>") +
        "</div></article>";
    }).join("");
    var glance = '<div class="' + CARD + ' p-space-lg flex flex-col gap-space-sm"><h3 class="font-title-md text-title-md text-primary font-bold">At a glance</h3><div class="relative overflow-x-auto"><table class="w-full font-body-sm text-body-sm min-w-[360px]"><thead><tr class="text-outline"><th class="text-left font-semibold py-1"></th>' +
      a.options.map(function (o, i) { return '<th class="text-right font-semibold py-1">Option ' + String.fromCharCode(65 + i) + "</th>"; }).join("") + "</tr></thead><tbody class=\"divide-y divide-surface-container\">" +
      '<tr><td class="py-2 text-on-surface-variant">Against estimate (' + short(it.est) + ")</td>" + a.options.map(function (o) { var d = it.est - o.price; return '<td class="py-2 text-right font-semibold tabular-nums ' + (d >= 0 ? "text-tertiary" : "text-error") + '">' + (d >= 0 ? short(d) + " under" : short(-d) + " over") + "</td>"; }).join("") + "</tr>" +
      '<tr><td class="py-2 text-on-surface-variant">Rating</td>' + a.options.map(function (o) { var v = vendor(o.vendor); return '<td class="py-2 text-right font-semibold">★ ' + v.rating + ' <span class="text-outline font-normal">(' + v.reviews + ")</span></td>"; }).join("") + "</tr>" +
      '<tr><td class="py-2 text-on-surface-variant">Events with us</td>' + a.options.map(function (o) { return '<td class="py-2 text-right font-semibold tabular-nums">' + vendor(o.vendor).jobs + "</td>"; }).join("") + "</tr></tbody></table></div></div>";
    return '<div class="flex flex-col gap-space-xs"><nav class="flex items-center gap-1 font-label-md text-label-md text-outline" aria-label="Breadcrumb"><a class="hover:text-primary" href="#event-' + e.id + '-plan">' + esc(e.name) + "</a>" + ic("chevron_right", "text-title-md") + '<span class="text-on-surface">' + esc(it.cat) + " approval</span></nav>" +
        '<div class="flex flex-wrap items-end justify-between gap-space-md"><div class="flex flex-col gap-space-xs"><span class="font-label-sm text-label-sm text-secondary font-bold">' + esc(it.cat) + " · Estimate " + naira(it.est) + '</span><h1 class="font-headline-xl-mobile text-headline-xl-mobile lg:font-headline-xl lg:text-headline-xl text-primary font-bold tracking-tight">' + (sent ? "Approval Request Sent" : "Send Approval Request") + '</h1><p class="font-body-md text-body-md text-on-surface-variant">' + (sent ? "Waiting for " + esc(e.client.short) + " to choose." : "Shortlisted " + esc(it.cat.toLowerCase()) + " options for " + esc(e.short) + ". Check the quotes, add your note and send.") + "</p></div>" +
        '<div class="flex gap-space-sm">' + '<div class="' + CARD + ' px-space-md py-space-sm text-center"><div class="font-title-md text-title-md text-primary font-bold">' + e.guests + '</div><div class="' + LABEL + '">Guests</div></div><div class="' + CARD + ' px-space-md py-space-sm text-center"><div class="font-title-md text-title-md text-primary font-bold">' + a.options.length + '</div><div class="' + LABEL + '">Options</div></div></div></div></div>' +
      '<div class="grid grid-cols-1 xl:grid-cols-12 gap-space-xl items-start"><section class="min-w-0 xl:col-span-8 flex flex-col gap-space-lg"><div class="grid grid-cols-1 md:grid-cols-2 gap-space-lg">' + cards + "</div>" + glance + "</section>" +
        '<aside class="min-w-0 xl:col-span-4 flex flex-col gap-space-lg"><div class="' + CARD + ' p-space-lg flex flex-col gap-space-md"><div class="flex items-center gap-space-sm">' + photo("planner-portrait", "w-11 h-11 rounded-full", "person", "") + '<div><div class="font-title-md text-title-md text-on-surface font-semibold">' + PLANNER.name + '</div><div class="font-label-sm text-label-sm text-secondary font-bold">' + PLANNER.role + "</div></div></div>" +
          (sent ? '<blockquote class="border-l-2 border-secondary pl-space-md italic font-body-sm text-body-sm text-on-surface-variant">“' + esc(a.note) + "”</blockquote>"
            : '<label for="note" class="' + LABEL + '">Note to ' + esc(e.client.short) + '</label><textarea id="note" rows="6" data-input="note" data-id="' + a.id + '" class="w-full p-space-md bg-surface-container-low border-0 rounded-xl font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary">' + esc(a.note) + "</textarea>") + "</div>" +
          '<div class="' + CARD + ' p-space-lg flex flex-col gap-space-md"><span class="' + LABEL + '">Dispatch channel</span>' +
            '<label class="flex items-center gap-space-sm bg-surface-container-low rounded-lg px-space-md py-space-sm cursor-pointer"><input type="checkbox" class="rounded text-primary-container focus:ring-primary" data-act="toggle-wa" data-id="' + a.id + '"' + (a.whatsapp ? " checked" : "") + (sent ? " disabled" : "") + '><span class="flex flex-col"><span class="font-label-md text-label-md text-on-surface font-semibold">' + ic("chat", "text-[16px] text-tertiary") + ' WhatsApp link</span><span class="font-label-sm text-label-sm text-outline">' + esc(e.client.name) + " · " + e.client.phone + "</span></span></label>" +
            '<div class="flex items-center justify-between gap-space-sm"><label for="deadline" class="font-body-sm text-body-sm text-on-surface-variant">Decide by</label><input id="deadline" type="date" data-input="deadline" data-id="' + a.id + '" value="' + a.deadline + '" class="h-10 px-space-sm bg-surface-container-low border-0 rounded-lg font-body-sm text-body-sm focus:ring-1 focus:ring-primary"' + (sent ? " disabled" : "") + "></div>" +
            (sent ? '<button class="' + BTN_SOFT + ' w-full" data-act="client-view" data-id="' + a.id + '">' + ic("smartphone", "text-title-md") + "See what " + esc(e.client.short) + " sees</button>"
              : '<button class="' + BTN + ' w-full py-space-md" data-act="send-approval" data-id="' + a.id + '">' + ic("outgoing_mail", "text-title-md") + "Send for Approval</button>") +
            '<a href="#event-' + e.id + '-plan" class="text-center font-label-md text-label-md text-outline hover:text-primary">Back to planning sheet</a></div></aside></div>';
  }

  // ---------- Close-out (Stitch wrap-up) ----------
  function tabCloseout(e) {
    var c = e.closeout, m = money(e);
    var actual = e.items.reduce(function (s, i) { return s + (i.actual || 0); }, 0), diff = m.est - actual;
    var used = e.items.filter(function (i) { return i.vendor; });
    var rated = used.filter(function (i) { return c.ratings[i.vendor]; }).length;
    var steps = [!!c.template.trim(), true, rated === used.length, !!c.lessons.trim()];
    var ready = steps.every(Boolean);
    if (e.closed) return '<div class="' + CARD + ' p-space-2xl flex flex-col items-center gap-space-sm text-center">' + ic("verified", "text-[44px] text-tertiary", true) + '<h3 class="font-headline-sm text-headline-sm text-primary">Event closed and archived</h3><p class="font-body-sm text-body-sm text-outline">Saved as the template “' + esc(c.template) + '”.</p><a class="' + BTN + '" href="#templates">View templates</a></div>';
    var stepper = ["Save as template", "Actual costs", "Rate vendors", "Lessons learned"].map(function (s, i) {
      return '<div class="flex items-center gap-space-sm"><span class="w-7 h-7 rounded-full flex items-center justify-center font-label-md text-label-md font-bold ' + (steps[i] ? "bg-tertiary text-on-tertiary" : "bg-surface-container text-on-surface-variant") + '">' + (steps[i] ? ic("check", "text-[16px]") : i + 1) + '</span><span class="font-label-md text-label-md ' + (steps[i] ? "text-on-surface" : "text-outline") + '">' + s + "</span></div>";
    }).join('<span class="hidden md:block flex-1 h-px bg-outline-variant/50"></span>');
    var avg = rated ? (used.reduce(function (s, i) { return s + (c.ratings[i.vendor] || 0); }, 0) / rated).toFixed(1) : "—";
    return '<section class="' + CARD + ' p-space-lg flex flex-col gap-space-lg"><div class="flex items-center gap-space-sm">' + ic("receipt_long", "text-secondary text-headline-sm") + '<h2 class="font-title-md text-title-md text-primary font-bold">Financial &amp; attendance ledger</h2></div>' +
        '<div class="grid grid-cols-2 lg:grid-cols-4 gap-space-md">' +
          ledger("Approved budget", naira(e.budget), "Baseline", "") + ledger("Final actual spend", naira(actual), (diff >= 0 ? naira(diff) + " under plan" : naira(-diff) + " over plan"), diff >= 0 ? "text-tertiary" : "text-error") +
          ledger("Verified turnout", c.verified + " / " + e.guests, Math.round(c.verified / e.guests * 100) + "% of guests", "") + ledger("Vendor rating", avg + " / 5", rated + " of " + used.length + " rated", "") + "</div></section>" +
      '<div class="' + CARD + ' p-space-md flex flex-wrap items-center gap-space-md">' + stepper + "</div>" +
      '<div class="grid grid-cols-1 xl:grid-cols-12 gap-space-xl items-start"><div class="min-w-0 xl:col-span-7 flex flex-col gap-space-xl">' +
        '<section class="' + CARD + ' p-space-lg flex flex-col gap-space-md"><div class="flex items-center gap-space-sm"><div class="w-10 h-10 rounded-xl bg-secondary-container/30 text-secondary flex items-center justify-center">' + ic("bookmark_added", "", true) + '</div><div><h3 class="font-title-md text-title-md text-primary font-bold">Save as reusable template</h3><p class="font-body-sm text-body-sm text-outline">The final plan and budget split become a starting point for the next event like this.</p></div></div>' +
          '<div class="flex flex-col gap-1"><label for="tpl-name" class="' + LABEL + '">Template name</label><input id="tpl-name" data-input="tpl-name" data-id="' + e.id + '" class="' + INPUT + '" value="' + esc(c.template) + '"></div>' +
          '<label class="flex items-center gap-space-sm font-body-sm text-body-sm text-on-surface"><input type="checkbox" class="rounded text-primary-container focus:ring-primary" data-act="tpl-share" data-id="' + e.id + '"' + (c.share ? " checked" : "") + "> Share with the other planners</label></section>" +
        '<section class="' + CARD + ' overflow-hidden"><div class="p-space-lg flex items-center justify-between gap-space-sm"><h3 class="font-title-md text-title-md text-primary font-bold">Cost reconciliation</h3><span class="font-label-sm text-label-sm px-2.5 py-1 rounded-full font-bold ' + (diff >= 0 ? "bg-tertiary-fixed text-tertiary-container" : "bg-error-container text-on-error-container") + '">' + (diff >= 0 ? "Saved " + short(diff) : "Over " + short(-diff)) + "</span></div>" +
          '<div class="relative overflow-x-auto"><table class="w-full text-left min-w-[520px]"><thead><tr class="text-outline text-[12px] font-medium border-b border-surface-container"><th class="py-space-sm px-space-md font-semibold">Category &amp; partner</th><th class="py-space-sm px-space-md font-semibold text-right">Estimated</th><th class="py-space-sm px-space-md font-semibold text-right">Actual</th><th class="py-space-sm px-space-md font-semibold text-right">Variance</th></tr></thead><tbody class="divide-y divide-surface-container">' +
          e.items.map(function (i) {
            var dv = (i.actual || 0) - i.est;
            return '<tr><td class="py-3 px-space-md"><div class="flex items-center gap-space-sm"><span class="w-8 h-8 rounded-lg bg-secondary-container/30 text-secondary flex items-center justify-center">' + ic(CAT_ICON[i.cat], "text-[18px]") + '</span><div class="flex flex-col"><span class="font-body-sm text-body-sm font-semibold text-on-surface">' + esc(i.cat) + '</span><span class="font-label-sm text-label-sm text-outline">' + esc(vendorName(i)) + "</span></div></div></td>" +
              '<td class="py-3 px-space-md text-right font-body-sm text-body-sm tabular-nums">' + naira(i.est) + '</td><td class="py-3 px-space-md text-right font-body-sm text-body-sm font-semibold tabular-nums">' + naira(i.actual || 0) + '</td><td class="py-3 px-space-md text-right"><span class="font-label-sm text-label-sm px-2 py-0.5 rounded-full font-bold tabular-nums ' + (dv > 0 ? "text-[#b25000]" : dv < 0 ? "bg-tertiary-fixed text-tertiary-container" : "text-outline") + '">' + (dv === 0 ? "On target" : (dv > 0 ? "+" : "−") + short(Math.abs(dv))) + "</span></td></tr>";
          }).join("") + '</tbody><tfoot><tr class="bg-surface-container-low font-bold"><td class="py-3 px-space-md font-body-sm text-body-sm text-primary">Reconciled totals</td><td class="py-3 px-space-md text-right font-body-sm text-body-sm tabular-nums">' + naira(m.est) + '</td><td class="py-3 px-space-md text-right font-body-sm text-body-sm tabular-nums">' + naira(actual) + '</td><td></td></tr></tfoot></table></div></section>' +
      "</div>" +
      '<div class="min-w-0 xl:col-span-5 flex flex-col gap-space-xl"><section class="' + CARD + ' p-space-lg flex flex-col gap-space-md"><div class="flex items-center justify-between"><h3 class="font-title-md text-title-md text-primary font-bold">Vendor performance</h3><span class="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container font-bold text-on-surface-variant">' + rated + "/" + used.length + " rated</span></div>" +
        used.map(function (i) {
          var v = vendor(i.vendor), r = c.ratings[i.vendor] || 0;
          return '<div class="flex items-center justify-between gap-space-sm bg-surface-container-low rounded-xl p-space-md"><div class="flex items-center gap-space-sm min-w-0"><div class="w-9 h-9 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center font-bold text-label-sm shrink-0">' + initials(v.name) + '</div><div class="flex flex-col min-w-0"><span class="font-body-sm text-body-sm font-semibold text-on-surface truncate">' + esc(v.name) + '</span><span class="font-label-sm text-label-sm text-outline">' + esc(i.cat) + "</span></div></div>" +
            '<div class="flex shrink-0" role="radiogroup" aria-label="Rate ' + esc(v.name) + '">' + [1, 2, 3, 4, 5].map(function (n) { return '<button role="radio" aria-checked="' + (r === n) + '" aria-label="' + n + " star" + (n > 1 ? "s" : "") + '" class="p-0.5 ' + (n <= r ? "text-gold" : "text-outline-variant hover:text-gold") + '" data-act="rate" data-id="' + e.id + '" data-vendor="' + i.vendor + '" data-n="' + n + '">' + ic("star", "text-[22px]", true) + "</button>"; }).join("") + "</div></div>";
        }).join("") + "</section>" +
        '<section class="' + CARD + ' p-space-lg flex flex-col gap-space-md"><div class="flex items-center gap-space-sm">' + ic("lightbulb", "text-secondary") + '<h3 class="font-title-md text-title-md text-primary font-bold">Lessons &amp; planner notes</h3></div><label for="lessons" class="sr-only">Lessons learned</label><textarea id="lessons" rows="5" data-input="lessons" data-id="' + e.id + '" class="w-full p-space-md bg-surface-container-low border-0 rounded-xl font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary">' + esc(c.lessons) + "</textarea></section></div></div>" +
      '<section class="' + CARD + ' p-space-lg flex flex-wrap items-center justify-between gap-space-md"><div class="flex items-center gap-space-md"><div class="w-12 h-12 rounded-xl bg-primary-container text-secondary-container flex items-center justify-center">' + ic("approval", "", true) + '</div><div><h3 class="font-title-md text-title-md text-primary font-bold">Party Riders seal of execution</h3><p class="font-body-sm text-body-sm text-outline">' + (ready ? "Everything is in. Closing locks the ledger and saves the template." : "Finish the steps above to close the event.") + "</p></div></div>" +
        '<button class="' + BTN + '" data-act="close-event" data-id="' + e.id + '"' + (ready ? "" : " disabled") + ">" + ic("approval", "text-title-md") + "Final sign-off &amp; close</button></section>";
  }
  function ledger(label, value, sub, subCls) {
    return '<div class="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-1"><span class="' + LABEL + '">' + label + '</span><span class="font-currency-md text-currency-md text-primary font-bold tabular-nums">' + value + '</span><span class="font-label-sm text-label-sm ' + (subCls || "text-outline") + ' font-semibold">' + sub + "</span></div>";
  }

  // ---------- Vendors ----------
  function viewVendors() {
    var cats = ["All"].concat(allVendors().map(function (v) { return v.cat; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
    var q = ui.vendorQuery.toLowerCase();
    var list = allVendors().filter(function (v) { return (ui.vendorCat === "All" || v.cat === ui.vendorCat) && (!q || (v.name + " " + v.cat + " " + v.area).toLowerCase().indexOf(q) >= 0); });
    var active = 0;
    S.events.forEach(function (e) { if (!e.completed) e.items.forEach(function (i) { if (i.vendor && i.status === "confirmed") active++; }); });
    var rated = allVendors().filter(function (v) { return v.rating > 0; }); var avg = (rated.reduce(function (s, v) { return s + v.rating; }, 0) / rated.length).toFixed(2);
    return pageHead("Verified roster", "Vendor Database", allVendors().length + " vetted celebration partners across Lagos and Ibadan.", '<button class="' + BTN + '" data-act="add-vendor">' + ic("add", "text-[18px]") + "Add vendor</button>") +
      '<div class="' + CARD + ' grid grid-cols-2 md:grid-cols-4 divide-x divide-surface-container">' +
        [["Total vetted vendors", allVendors().length], ["Active bookings", active], ["Average rating", avg + " ★"], ["Categories", cats.length - 1]].map(function (s) { return '<div class="p-space-lg flex flex-col gap-1"><span class="' + LABEL + '">' + s[0] + '</span><span class="font-headline-md text-headline-md text-primary font-bold tabular-nums">' + s[1] + "</span></div>"; }).join("") + "</div>" +
      '<div class="' + CARD + ' p-space-md flex flex-wrap items-center justify-between gap-space-sm"><div class="relative flex-1 min-w-[220px] max-w-md">' + ic("search", "absolute left-3 top-2.5 text-outline text-headline-sm") + '<label for="vendor-q" class="sr-only">Search vendors</label><input id="vendor-q" data-input="vendor-q" class="w-full h-10 pl-10 pr-space-md bg-surface-container-low border-0 rounded-xl font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Search by vendor name or speciality" value="' + esc(ui.vendorQuery) + '"></div>' +
        '<div class="flex items-center gap-space-xs overflow-x-auto" role="group" aria-label="Category">' + cats.map(function (c) { return '<button data-act="vendor-cat" data-id="' + esc(c) + '" aria-pressed="' + (ui.vendorCat === c) + '" class="' + (ui.vendorCat === c ? PILL_ON : PILL_OFF) + '">' + esc(c) + "</button>"; }).join("") + "</div></div>" +
      (list.length ? '<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-space-lg" data-stagger>' + list.map(vendorCard).join("") + "</div>"
        : '<div class="' + CARD + ' p-space-2xl text-center font-body-sm text-body-sm text-outline">No vendors match.</div>');
  }
  function openVendorForm() {
    var layer = document.getElementById("layer");
    layer.innerHTML = '<div class="fixed inset-0 bg-[#000000]/25 backdrop-blur-[6px] z-[60] pr-fade" data-act="close-drawer"></div>' +
      '<form id="vendor-form" class="fixed top-0 right-0 bottom-0 w-full max-w-[480px] bg-surface-container-lowest z-[61] shadow-2xl flex flex-col pr-slide sm:rounded-l-[28px] overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="vf-h" novalidate>' +
        '<div class="flex items-center justify-between px-6 py-5 border-b border-surface-container"><h2 id="vf-h" class="text-[22px] font-bold tracking-[-0.02em]">Add vendor</h2><button type="button" class="w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center" data-act="close-drawer" aria-label="Close">' + ic("close") + "</button></div>" +
        '<div class="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">' +
          '<div class="flex flex-col gap-1"><label for="vf-name" class="' + LABEL + '">Business name</label><input id="vf-name" class="' + INPUT + '" placeholder="e.g. Ivory Lens Studio"></div>' +
          '<div class="flex flex-col gap-1"><label for="vf-cat" class="' + LABEL + '">Category</label><select id="vf-cat" class="' + INPUT + '">' + CATS.filter(function (c) { return c !== "Venue"; }).map(function (c) { return "<option>" + c + "</option>"; }).join("") + "</select></div>" +
          '<div class="flex flex-col gap-1"><label for="vf-area" class="' + LABEL + '">Area</label><input id="vf-area" class="' + INPUT + '" placeholder="e.g. Lekki Phase 1, Lagos"></div>' +
          '<div class="flex flex-col gap-1"><label for="vf-price" class="' + LABEL + '">Price range</label><input id="vf-price" class="' + INPUT + '" placeholder="e.g. ₦1M–₦2.5M"></div>' +
          '<div class="flex flex-col gap-1"><label for="vf-phone" class="' + LABEL + '">WhatsApp number</label><input id="vf-phone" type="tel" class="' + INPUT + '" placeholder="+234 …"></div>' +
          '<p class="text-[13px] text-outline">New vendors show as unrated until they finish their first event with us.</p><p id="vf-err" role="alert" class="text-[13px] text-error"></p></div>' +
        '<div class="flex justify-end gap-2 px-6 py-4 border-t border-surface-container"><button type="button" class="' + BTN_SOFT + '" data-act="close-drawer">Cancel</button><button type="submit" class="' + BTN + '">Add to roster</button></div></form>';
    setTimeout(function () { var f = document.getElementById("vf-name"); if (f) f.focus(); }, 40);
  }
  function vendorCard(v) {
    return '<article class="pr-card group ' + CARD + ' overflow-hidden flex flex-col">' +
      '<div class="relative h-48 overflow-hidden">' + photo(v.img, "absolute inset-0 w-full h-full pr-zoom", CAT_ICON[v.cat], v.name) + '<span class="absolute top-3 left-3 bg-surface-container-lowest/95 text-primary font-label-sm text-label-sm px-2.5 py-1 rounded-full font-bold">' + esc(v.cat) + '</span><span class="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/95 text-tertiary flex items-center justify-center" title="Vetted">' + ic("verified", "text-[18px]", true) + "</span></div>" +
      '<div class="p-space-lg flex flex-col gap-space-sm flex-1"><div class="flex items-start justify-between gap-space-sm"><h3 class="font-title-md text-title-md text-primary font-bold">' + esc(v.name) + '</h3><span class="flex items-center gap-0.5 font-label-md text-label-md text-on-surface font-bold shrink-0">' + (v.rating ? ic("star", "text-[16px] text-gold", true) + v.rating + ' <span class="text-outline font-normal">(' + v.reviews + ")</span>" : '<span class="text-outline font-medium">New</span>') + "</span></div>" +
        '<span class="flex items-center gap-1 font-body-sm text-body-sm text-outline">' + ic("location_on", "text-[16px]") + esc(v.area) + "</span>" +
        '<span class="font-title-md text-title-md text-on-surface font-semibold tabular-nums">' + esc(v.price) + "</span>" +
        '<p class="font-body-sm text-body-sm text-on-surface-variant">' + esc(v.blurb) + "</p>" +
        '<div class="flex flex-wrap gap-space-xs mt-auto pt-space-xs">' + v.tags.map(function (t) { return '<span class="font-label-sm text-label-sm px-2 py-1 rounded-md bg-surface-container text-on-surface-variant font-semibold">' + esc(t) + "</span>"; }).join("") + "</div></div></article>";
  }

  // ---------- Templates + New event ----------
  function viewTemplates() {
    return pageHead("Studio library", "Templates", "Every closed event can become a template. Start a new event from any of these.", '<a class="' + BTN_GOLD + '" href="#new-event">' + ic("add_circle", "text-title-md") + "Create Event</a>") +
      '<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-lg" data-stagger>' + S.templates.map(function (t) { return tplCard(t, false); }).join("") + "</div>";
  }
  function tplCard(t, selectable) {
    var sel = selectable && ui.newEvent.tpl === t.id;
    var tag = selectable ? "button" : "article";
    return "<" + tag + (selectable ? ' type="button" data-act="ne-tpl" data-id="' + t.id + '" aria-pressed="' + sel + '"' : "") + ' class="text-left ' + CARD + ' overflow-hidden flex flex-col border-2 transition-all ' + (sel ? "border-primary-container shadow-lg" : "border-transparent hover:border-outline-variant") + '">' +
      '<div class="relative h-32">' + photo(t.img, "absolute inset-0 w-full h-full", "auto_stories", "") + '<div class="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent"></div>' +
        (t.popular ? '<span class="absolute top-3 left-3 bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-2.5 py-1 rounded-full font-bold">Most popular</span>' : t.from ? '<span class="absolute top-3 left-3 bg-tertiary-fixed text-tertiary-container font-label-sm text-label-sm px-2.5 py-1 rounded-full font-bold">New</span>' : "") +
        (sel ? '<span class="absolute top-3 right-3 w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center">' + ic("check", "text-[18px]") + "</span>" : "") +
        '<span class="absolute bottom-3 left-4 font-label-sm text-label-sm text-on-primary font-bold">' + t.guests + " guests</span></div>" +
      '<div class="p-space-lg flex flex-col gap-space-sm"><span class="font-label-sm text-label-sm text-secondary font-bold">' + esc(t.type) + '</span><h3 class="font-title-md text-title-md text-primary font-bold">' + esc(t.name) + '</h3><p class="font-body-sm text-body-sm text-on-surface-variant">' + esc(t.from ? "From " + t.from : t.blurb) + "</p>" +
        '<div class="grid grid-cols-3 gap-space-sm pt-space-sm border-t border-surface-container">' + [["Budget", t.budget], ["Items", t.parts.length], ["Timeline", t.lead]].map(function (x) { return '<div class="flex flex-col"><span class="' + LABEL + '">' + x[0] + '</span><span class="font-label-md text-label-md text-on-surface font-semibold">' + x[1] + "</span></div>"; }).join("") + "</div>" +
        (selectable ? "" : '<button class="' + BTN_SOFT + ' mt-space-xs" data-act="use-template" data-id="' + t.id + '">Use template' + ic("arrow_forward", "text-title-md") + "</button>") + "</div></" + tag + ">";
  }
  function viewNewEvent() {
    var ne = ui.newEvent, t = S.templates.filter(function (x) { return x.id === ne.tpl; })[0];
    var stepper = '<div class="' + CARD + ' p-space-md grid grid-cols-1 md:grid-cols-3 gap-space-sm">' + [["Archetype", ne.type], ["Blueprint", t ? t.name : "Blank"], ["Details & host", "WhatsApp invite"]].map(function (s, i) {
      var done = ne.step === 2 ? i < 2 : false, on = ne.step === 2 ? i === 2 : i < 2;
      return '<div class="flex items-center gap-space-sm px-space-md py-space-sm rounded-xl ' + (on ? "bg-surface-container-low" : "") + '"><span class="w-7 h-7 rounded-full flex items-center justify-center font-label-md text-label-md font-bold ' + (done ? "bg-tertiary text-on-tertiary" : on ? "bg-primary-container text-on-primary" : "bg-surface-container text-outline") + '">' + (done ? ic("check", "text-[16px]") : i + 1) + '</span><div class="flex flex-col"><span class="' + LABEL + '">Step ' + (i + 1) + '</span><span class="font-label-md text-label-md text-on-surface font-semibold">' + esc(s[0] + ": " + s[1]) + "</span></div></div>";
    }).join("") + "</div>";
    var head = pageHead("Studio production engine", "Create Event from Curated Template", "Start from a proven blueprint with itemised budget, vendor categories and a WhatsApp invite for your client.", "") + stepper;
    if (ne.step === 1) {
      var list = S.templates.filter(function (x) { return x.type === ne.type; });
      return head +
        '<section class="flex flex-col gap-space-md"><h2 class="font-headline-sm text-headline-sm text-primary font-bold flex items-center gap-space-sm"><span class="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-md text-label-md">1</span>Celebration archetype</h2>' +
          '<div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-space-md" role="group" aria-label="Archetype">' + ARCHETYPES.map(function (a) {
            var n = S.templates.filter(function (x) { return x.type === a.type; }).length, on = ne.type === a.type;
            return '<button type="button" data-act="ne-type" data-id="' + a.type + '" aria-pressed="' + on + '" class="text-left ' + CARD + ' p-space-md flex flex-col gap-space-sm border-2 ' + (on ? "border-primary-container" : "border-transparent hover:border-outline-variant") + '"><span class="w-10 h-10 rounded-xl flex items-center justify-center ' + (on ? "bg-primary-container text-secondary-container" : "bg-surface-container text-primary") + '">' + ic(a.icon, "", true) + '</span><span class="font-title-md text-title-md text-on-surface font-semibold">' + a.label + '</span><span class="font-body-sm text-body-sm text-outline">' + a.sub + '</span><span class="font-label-sm text-label-sm text-secondary font-bold">' + n + " blueprint" + (n === 1 ? "" : "s") + "</span></button>";
          }).join("") + "</div></section>" +
        '<section class="flex flex-col gap-space-md"><h2 class="font-headline-sm text-headline-sm text-primary font-bold flex items-center gap-space-sm"><span class="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-md text-label-md">2</span>Curated blueprints</h2>' +
          (list.length ? '<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-lg">' + list.map(function (x) { return tplCard(x, true); }).join("") + "</div>"
            : '<div class="' + CARD + ' p-space-xl text-center font-body-sm text-body-sm text-outline">No ' + esc(ne.type.toLowerCase()) + " blueprints yet. Continue with a blank plan; closing the event creates the first one.</div>") + "</section>" +
        '<div class="flex justify-end gap-space-sm"><a class="' + BTN_SOFT + '" href="#events">Discard</a><button class="' + BTN + '" data-act="ne-next">Continue to details' + ic("arrow_forward", "text-title-md") + "</button></div>";
    }
    var d = ne.form || { name: "", client: "", phone: "", date: "2027-02-20", venue: "", guests: "", budget: "" };
    var first = (d.client || "your client").split(" ")[0];
    return head +
      '<form id="ne-form" class="grid grid-cols-1 xl:grid-cols-12 gap-space-xl items-start" novalidate><section class="min-w-0 xl:col-span-7 ' + CARD + ' p-space-lg flex flex-col gap-space-md">' +
        '<div class="flex items-center justify-between gap-space-sm"><h2 class="font-title-md text-title-md text-primary font-bold flex items-center gap-space-xs">' + ic("event_available", "text-secondary") + 'Event parameters</h2><span class="bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm px-2.5 py-1 rounded-full font-bold">' + (t ? "Template pre-filled" : "Blank plan") + "</span></div>" +
        '<div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">' +
          fld("ne-name", "Event title", "text", d.name, "e.g. Tolani & Femi's Wedding", "md:col-span-2") + fld("ne-date", "Date", "date", d.date, "") + fld("ne-guests", "Guest target", "number", d.guests, "350") +
          fld("ne-venue", "Venue", "text", d.venue, "e.g. Eko Pearl Event Centre, Lekki", "md:col-span-2") + fld("ne-budget", "Target budget cap (₦)", "number", d.budget, "18500000") +
          '<div class="flex flex-col gap-1"><span class="' + LABEL + '">Assigned concierge</span><div class="h-11 px-space-md bg-surface-container-low rounded-xl flex items-center font-body-sm text-body-sm text-on-surface">' + PLANNER.name + " (Lagos HQ)</div></div></div>" +
        (t ? '<div class="flex flex-wrap items-center gap-space-sm bg-surface-container-low rounded-lg px-space-md py-space-sm font-body-sm text-body-sm text-on-surface-variant">' + ic("bolt", "text-secondary") + "Blueprint adds " + t.parts.length + " planning items split across the budget · <button type=\"button\" class=\"text-primary font-semibold hover:underline\" data-act=\"ne-back\">Change blueprint</button></div>" : "") +
      "</section>" +
      '<section class="min-w-0 xl:col-span-5 ' + CARD + ' p-space-lg flex flex-col gap-space-md"><div class="flex items-center justify-between"><h2 class="font-title-md text-title-md text-primary font-bold flex items-center gap-space-xs">' + ic("mark_chat_unread", "text-secondary") + 'Client host onboarding</h2><span class="bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm px-2.5 py-1 rounded-full font-bold">Portal access</span></div>' +
        fld("ne-client", "Host name", "text", d.client, "e.g. Tolani Adewale") + fld("ne-phone", "Host WhatsApp", "tel", d.phone, "+234 …") +
        '<div class="grid grid-cols-2 gap-3"><div class="flex flex-col gap-1"><label for="ne-pkg" class="' + LABEL + '">Package</label><select id="ne-pkg" class="' + INPUT + '">' + PKGS.map(function (p) { return "<option" + (p === (d.pkg || "Full planning") ? " selected" : "") + ">" + p + "</option>"; }).join("") + "</select></div>" + fld("ne-fee", "Planning fee (₦)", "number", d.fee || "", "2500000") + "</div>" +
        '<label class="flex items-center gap-2 text-[14px] text-on-surface"><input type="checkbox" id="ne-invite" class="rounded text-plum focus:ring-plum" checked> Send the portal invite on WhatsApp now</label>' +
        '<div class="flex flex-col gap-1"><span class="' + LABEL + '">WhatsApp invite preview</span><div class="bg-surface-container-low rounded-xl rounded-tl-none p-space-md font-body-sm text-body-sm text-on-surface">Hi ' + esc(first) + "! Your Party Riders portal for " + esc(d.name || "your celebration") + " is ready. Follow every booking and approve choices from your phone. — " + PLANNER.first + "</div></div>" +
        '<p id="ne-err" role="alert" class="font-body-sm text-body-sm text-error"></p>' +
        '<div class="flex flex-wrap justify-end gap-space-sm"><button type="button" class="' + BTN_SOFT + '" data-act="ne-back">Back</button><button type="submit" class="' + BTN + '">Create Event &amp; Launch Workspace' + ic("arrow_forward", "text-title-md") + "</button></div></section></form>";
  }
  function fld(id, label, type, val, ph, cls) {
    return '<div class="flex flex-col gap-1 ' + (cls || "") + '"><label for="' + id + '" class="' + LABEL + '">' + label + '</label><input id="' + id + '" type="' + type + '" data-input="ne-field" class="' + INPUT + '" value="' + esc(val) + '" placeholder="' + esc(ph) + '"' + (type === "number" ? ' min="1" inputmode="numeric"' : "") + "></div>";
  }

  // ---------- Item drawer: edit details + find vendor ----------
  function openItem(e, it) {
    var isNew = !it || !it.id;
    it = it || { id: null, cat: "Cake", name: "", vendor: null, venue: "", est: "", actual: null, status: "unbooked" };
    var a = it.id ? apprFor(it.id) : null;
    var pick = ui.pick[it.id || "new"] || [];
    var vs = allVendors().filter(function (v) { return v.cat === it.cat; });
    var vendorSection;
    if (it.vendor || it.venue) {
      var vn = vendorName(it), v = it.vendor ? vendor(it.vendor) : null;
      vendorSection = '<div class="flex items-center justify-between gap-space-sm bg-surface-container-low rounded-xl p-space-md"><div class="flex items-center gap-space-sm min-w-0"><div class="w-10 h-10 rounded-full bg-surface-container-lowest text-primary font-bold text-label-sm flex items-center justify-center shrink-0">' + initials(vn) + '</div><div class="flex flex-col min-w-0"><span class="font-body-sm text-body-sm font-semibold text-on-surface">' + esc(vn) + '</span><span class="font-label-sm text-label-sm text-outline">' + (v ? esc(v.area) + " · ★ " + v.rating : "Venue") + "</span></div></div>" +
        (v ? '<span class="bg-tertiary-fixed text-tertiary-container font-label-sm text-label-sm px-2 py-0.5 rounded-full font-bold shrink-0">Vetted partner</span>' : "") + "</div>" +
        (isNew || !it.vendor ? "" : '<button type="button" class="self-start font-label-md text-label-md text-primary font-semibold hover:underline" data-act="unassign" data-id="' + it.id + '">Change vendor</button>');
    } else if (a) {
      vendorSection = '<div class="bg-primary-fixed/40 rounded-xl p-space-md flex flex-col gap-space-sm"><div class="flex items-center gap-space-sm">' + ic("how_to_vote", "text-primary-container") + '<span class="font-body-sm text-body-sm font-semibold text-on-surface">' + a.options.length + " options shortlisted · " + (a.status === "sent" ? "awaiting " + esc(e.client.short) : "not sent yet") + "</span></div>" +
        '<div class="flex flex-wrap gap-space-xs">' + a.options.map(function (o) { return '<span class="font-label-sm text-label-sm px-2 py-1 rounded-md bg-surface-container-lowest text-on-surface font-semibold">' + esc(vendor(o.vendor).name) + " · " + short(o.price) + "</span>"; }).join("") + "</div>" +
        '<a class="' + BTN + ' self-start" href="#send-' + e.id + "-" + it.id + '">' + (a.status === "sent" ? "View request" : "Review & send") + ic("arrow_forward", "text-title-md") + "</a></div>";
    } else {
      vendorSection = '<p class="font-body-sm text-body-sm text-on-surface-variant">Pick one to book directly, or shortlist two or three and send them to ' + esc(e.client.short) + ' to choose.</p>' +
        (vs.length ? '<div class="flex flex-col gap-space-xs" id="pick-list">' + vs.map(function (v) {
          var on = pick.indexOf(v.id) >= 0;
          return '<label class="flex items-center gap-space-sm rounded-xl p-space-sm border-2 cursor-pointer transition-colors ' + (on ? "border-primary-container bg-primary-fixed/20" : "border-transparent bg-surface-container-low hover:border-outline-variant") + '">' +
            '<input type="checkbox" class="rounded text-primary-container focus:ring-primary" data-act="pick" data-id="' + v.id + '" data-item="' + (it.id || "new") + '"' + (on ? " checked" : "") + ">" +
            photo(v.img, "w-12 h-12 rounded-lg", CAT_ICON[v.cat], "") +
            '<span class="flex flex-col min-w-0 flex-1"><span class="font-body-sm text-body-sm font-semibold text-on-surface">' + esc(v.name) + '</span><span class="font-label-sm text-label-sm text-outline">' + esc(v.area) + " · " + esc(v.price) + '</span></span><span class="flex items-center gap-0.5 font-label-md text-label-md font-bold text-on-surface shrink-0">' + ic("star", "text-[15px] text-gold", true) + v.rating + "</span></label>";
        }).join("") + "</div>" : '<p class="font-body-sm text-body-sm text-outline bg-surface-container-low rounded-xl p-space-md">No vetted vendors in this category yet.</p>') +
        '<details class="rounded-2xl bg-surface-container-low px-4 py-3"><summary class="cursor-pointer text-[14px] font-semibold text-on-surface">The client has their own vendor</summary><div class="flex flex-col gap-2 pt-3"><label for="cv-name" class="' + LABEL + '">Vendor name</label><input id="cv-name" class="' + INPUT + ' bg-surface-container-lowest" placeholder="e.g. Auntie Bisi Cakes"><label for="cv-phone" class="' + LABEL + '">WhatsApp number</label><input id="cv-phone" type="tel" class="' + INPUT + ' bg-surface-container-lowest" placeholder="+234 …"><button type="button" class="' + BTN_SOFT + ' self-start" data-act="client-vendor">Add client\'s vendor</button><p class="text-[12px] text-outline">Tracked on this item only. Invite them to join Party Riders later.</p></div></details>' +
        '<div class="flex flex-wrap gap-space-sm"><button type="button" class="' + BTN_SOFT + '" data-act="book-direct" data-item="' + (it.id || "new") + '"' + (pick.length === 1 ? "" : " disabled") + ">" + ic("handshake", "text-title-md") + "Book selected</button>" +
          '<button type="button" class="' + BTN + '" data-act="shortlist" data-item="' + (it.id || "new") + '"' + (pick.length >= 2 ? "" : " disabled") + ">" + ic("outgoing_mail", "text-title-md") + (pick.length >= 2 ? "Send " + pick.length + " to " + esc(e.client.short) : "Shortlist 2+ to send") + "</button></div>";
    }
    var layer = document.getElementById("layer");
    layer.innerHTML = '<div class="fixed inset-0 bg-[#000000]/25 backdrop-blur-[6px] z-[60] pr-fade" data-act="close-drawer"></div>' +
      '<form id="item-form" class="fixed top-0 right-0 bottom-0 w-full max-w-[560px] bg-surface-container-lowest z-[61] shadow-2xl flex flex-col pr-slide sm:rounded-l-[28px] overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="dr-h" novalidate>' +
        '<div class="flex items-start justify-between gap-space-md px-space-lg py-space-lg border-b border-surface-container"><div class="flex items-center gap-space-sm"><div class="w-10 h-10 rounded-xl bg-primary-container text-secondary-container flex items-center justify-center">' + ic(CAT_ICON[it.cat] || "category") + '</div><div><span class="font-label-sm text-label-sm text-secondary font-bold">' + (isNew ? "New planning item" : "Planning line item · " + esc(e.short)) + '</span><h2 id="dr-h" class="font-headline-sm text-headline-sm text-primary font-bold">' + (isNew ? "Add Planning Item" : "Edit Deliverable Details") + "</h2></div></div>" +
          '<button type="button" class="w-10 h-10 rounded-xl hover:bg-surface-container flex items-center justify-center text-on-surface-variant" data-act="close-drawer" aria-label="Close">' + ic("close") + "</button></div>" +
        '<div class="flex-1 overflow-y-auto px-space-lg py-space-lg flex flex-col gap-space-lg">' +
          '<div class="grid grid-cols-1 sm:grid-cols-2 gap-space-md"><div class="flex flex-col gap-1"><label for="f-cat" class="' + LABEL + '">Category</label><select id="f-cat" class="' + INPUT + '"' + (it.vendor || a ? " disabled" : "") + ">" + CATS.map(function (c) { return "<option" + (c === it.cat ? " selected" : "") + ">" + c + "</option>"; }).join("") + "</select></div>" +
            '<div class="flex flex-col gap-1"><label for="f-status" class="' + LABEL + '">Workflow state</label><select id="f-status" class="' + INPUT + '">' + [["unbooked", "Unbooked"], ["pending", "Pending"], ["confirmed", "Confirmed"]].map(function (s) { return '<option value="' + s[0] + '"' + (it.status === s[0] ? " selected" : "") + ">" + s[1] + "</option>"; }).join("") + "</select></div></div>" +
          '<div class="flex flex-col gap-1"><label for="f-name" class="' + LABEL + '">Deliverable &amp; scope</label><input id="f-name" class="' + INPUT + '" value="' + esc(it.name) + '" placeholder="e.g. Five-tier wedding cake"></div>' +
          '<section class="flex flex-col gap-space-sm"><h3 class="font-title-md text-title-md text-primary font-bold flex items-center gap-space-xs">' + ic("storefront", "text-secondary") + (it.vendor || it.venue ? "Assigned vendor partner" : a ? "Client decision" : "Find a vendor") + "</h3>" + vendorSection + "</section>" +
          '<section class="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-md"><h3 class="font-title-md text-title-md text-primary font-bold">Budget &amp; contract financials</h3><div class="grid grid-cols-2 gap-space-md">' +
            '<div class="flex flex-col gap-1"><label for="f-est" class="' + LABEL + '">Estimated allocation</label><div class="relative"><span class="absolute left-3 top-2.5 text-outline font-semibold">₦</span><input id="f-est" type="number" min="0" inputmode="numeric" class="' + INPUT + ' pl-8 bg-surface-container-lowest tabular-nums" value="' + esc(it.est) + '"></div></div>' +
            '<div class="flex flex-col gap-1"><label for="f-act" class="' + LABEL + '">Actual contract value</label><div class="relative"><span class="absolute left-3 top-2.5 text-outline font-semibold">₦</span><input id="f-act" type="number" min="0" inputmode="numeric" class="' + INPUT + ' pl-8 bg-surface-container-lowest tabular-nums" value="' + (it.actual != null ? it.actual : "") + '" placeholder="After signing"></div></div></div></section>' +
          '<p id="f-err" role="alert" class="font-body-sm text-body-sm text-error"></p>' +
        "</div>" +
        '<div class="flex items-center justify-between gap-space-sm px-space-lg py-space-md border-t border-surface-container">' + (isNew ? "<span></span>" : '<button type="button" class="font-label-md text-label-md text-error font-semibold flex items-center gap-1 hover:underline" data-act="delete-item" data-id="' + it.id + '">' + ic("delete", "text-title-md") + "Delete item</button>") +
          '<div class="flex gap-space-sm"><button type="button" class="' + BTN_SOFT + '" data-act="close-drawer">Cancel</button><button type="submit" class="' + BTN + '">' + ic("check", "text-title-md") + (isNew ? "Create item" : "Save changes") + "</button></div></div>" +
      "</form>";
    layer.dataset.event = e.id; layer.dataset.item = it.id || "";
    var cat = document.getElementById("f-cat");
    if (cat) cat.addEventListener("change", function () { draft(); ui.drawerDraft.cat = cat.value; ui.pick.new = []; reopen(); });
  }
  function draft() {
    var g = function (id) { var n = document.getElementById(id); return n ? n.value : null; };
    ui.drawerDraft = { cat: g("f-cat"), name: g("f-name"), est: g("f-est"), act: g("f-act"), status: g("f-status") };
  }
  function reopen() {
    var layer = document.getElementById("layer"), e = ev(layer.dataset.event);
    var existing = layer.dataset.item ? itemOf(e, layer.dataset.item) : null;
    var temp = existing ? Object.assign({}, existing) : { id: null, cat: "Cake", name: "", vendor: null, venue: "", est: "", actual: null, status: "unbooked" };
    var d = ui.drawerDraft;
    if (d) {
      if (d.cat) temp.cat = d.cat;
      if (d.name != null) temp.name = d.name;
      if (d.est != null) temp.est = d.est;
      if (d.act != null && d.act !== "") temp.actual = +d.act;
      if (d.status) temp.status = d.status;
    }
    openItem(e, temp);
  }
  function closeDrawer() { var l = document.getElementById("layer"); if (l) l.innerHTML = ""; ui.drawerDraft = null; }
  function saveItemFromForm(e, itemId) {
    var name = document.getElementById("f-name").value.trim(), est = +document.getElementById("f-est").value, actRaw = document.getElementById("f-act").value;
    if (!name) { document.getElementById("f-err").textContent = "Describe the deliverable, for example “Five-tier wedding cake”."; return null; }
    if (!est) { document.getElementById("f-err").textContent = "Add the estimated allocation in naira."; return null; }
    var data = { cat: document.getElementById("f-cat").value, name: name, est: est, actual: actRaw === "" ? null : +actRaw, status: document.getElementById("f-status").value };
    if (itemId) { Object.assign(itemOf(e, itemId), data); return itemOf(e, itemId); }
    data.id = "n" + Date.now().toString(36); data.vendor = null; data.venue = "";
    e.items.push(data); return data;
  }

  // ---------- Client portal (Stitch mobile) ----------
  function viewPortal(r) {
    var e = ev(S.portal) || ev("adaeze"), w = S.approvals.filter(function (a) { return a.event === e.id && a.status === "sent"; });
    var m, body, tab = "home";
    if (r === "client-decisions") { tab = "decisions"; body = pDecisions(e); }
    else if ((m = r.match(/^client-decision-([a-z0-9-]+)$/))) { tab = "decisions"; body = pDecision(e, m[1]); }
    else if (r === "client-budget") { tab = "budget"; body = pBudget(e); }
    else if (r === "client-welcome") { tab = "welcome"; body = pWelcome(e); }
    else body = pHome(e, w);
    function t(id, icon, label, badge) {
      var on = tab === id;
      return '<a href="#client-' + id + '" class="relative flex flex-col items-center gap-0.5 py-1.5 font-label-sm text-label-sm ' + (on ? "text-primary font-bold" : "text-outline font-medium") + '"' + (on ? ' aria-current="page"' : "") + ">" + ic(icon, "text-[24px]", on) + label +
        (badge ? '<span class="absolute top-0 left-1/2 ml-2 min-w-[18px] h-[18px] px-1 rounded-full bg-secondary text-on-secondary text-[10px] font-bold flex items-center justify-center">' + badge + "</span>" : "") + "</a>";
    }
    return (ui.from ? previewBar(e.client.short + "'s portal") : "") +
      '<div class="min-h-screen bg-surface flex justify-center"><div class="relative w-full max-w-[440px] min-h-screen bg-surface sm:shadow-[0_0_60px_-30px_rgba(74,25,66,0.35)] flex flex-col">' +
        '<header style="view-transition-name:pr-phead" class="sticky top-0 z-40 pr-glass border-b border-black/[0.05]"><div class="h-16 pr-gx flex items-center justify-between"><a href="#client-home" class="flex items-center gap-space-sm"><span class="w-9 h-9 rounded-xl bg-plum flex items-center justify-center text-gold shadow-[0_2px_8px_rgba(74,25,66,0.12)]">' + ic("celebration", "text-[20px]") + '</span><span class="flex flex-col"><span class="font-title-md text-title-md text-primary tracking-tight leading-tight">Party Riders</span><span class="font-label-sm text-label-sm text-secondary leading-none">' + esc(e.short) + '</span></span></a>' +
          '<span class="w-8 h-8 rounded-full bg-primary flex items-center justify-center" aria-label="Signed in as ' + esc(e.client.short) + '">' + ic("person", "text-on-primary text-[18px]") + "</span></div></header>" +
        '<main class="flex-1 pr-gx pt-6 pb-32 flex flex-col gap-5" data-view data-stagger>' + body + "</main>" +
        (tab === "welcome" ? "" : '<nav style="view-transition-name:pr-ptabs" class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-40 pr-glass border-t border-black/[0.05] grid grid-cols-3 pb-safe px-2" aria-label="Portal">' +
          t("home", "home", "Home") + t("decisions", "task_alt", "Approvals", w.length) + t("budget", "account_balance_wallet", "Budget") + "</nav>") +
      "</div></div>";
  }
  function previewBar(what) {
    return '<div class="sticky top-0 z-[70] w-full bg-primary text-on-primary flex flex-wrap items-center justify-center gap-space-md py-space-xs pr-gx font-body-sm text-body-sm">' + ic("visibility", "text-[18px] text-secondary-container") + "<span>Previewing " + what + '</span><a href="#' + ui.from + '" class="font-bold text-secondary-container flex items-center gap-1 hover:underline">' + ic("arrow_back", "text-[16px]") + "Back to workspace</a></div>";
  }
  function pHome(e, w) {
    var m = money(e), d = daysTo(e.date), pct = Math.round(m.confirmed / m.total * 100);
    return '<section class="flex flex-col gap-2.5"><h1 class="font-headline-xl-mobile text-headline-xl-mobile text-primary tracking-tight">Good morning, ' + esc(e.client.short) + '</h1>' +
        '<p class="font-body-sm text-body-sm text-on-surface-variant flex flex-wrap items-center gap-1">Planning with <span class="font-title-md text-title-md text-primary font-semibold">' + PLANNER.name + '</span> <span class="font-label-sm text-label-sm text-secondary font-bold">(Lead Planner)</span></p>' +
        '<span class="inline-flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-full shadow-sm self-start">' + ic("location_on", "text-secondary text-[16px]") + '<span class="font-label-md text-label-md text-on-surface">' + fmtDate(e.date) + " • " + esc(e.venue) + '</span></span></section>' +
      '<section class="relative overflow-hidden rounded-xl bg-primary-container text-on-primary p-5 shadow-xl"><svg class="absolute -right-10 -bottom-10 w-52 h-52 text-secondary-container opacity-10 pointer-events-none" fill="currentColor" viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"></polygon><circle cx="50" cy="50" fill="none" r="45" stroke="currentColor" stroke-dasharray="4 4" stroke-width="2"></circle></svg>' +
        '<div class="relative z-10 flex flex-col gap-4"><span class="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-white/15 text-white font-label-sm text-label-sm font-bold"><span class="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>Countdown to reception</span>' +
          '<div class="flex items-baseline gap-2.5"><span class="font-display-lg-mobile text-display-lg-mobile font-bold tracking-tight text-gold leading-none tabular-nums">' + d + '</span><span class="font-headline-sm text-headline-sm text-on-primary/90 font-medium">days to go</span></div>' +
          '<div class="flex items-center justify-between bg-white/10 rounded-lg px-3 py-2"><span class="flex items-center gap-2">' + ic("calendar_month", "text-secondary-container text-[18px]") + '<span class="font-body-sm text-body-sm">' + Math.ceil(d / 7) + ' weeks left</span></span><span class="flex items-center gap-2">' + ic("group", "text-secondary-container text-[18px]") + '<span class="font-body-sm text-body-sm font-medium">' + e.guests + " guests</span></span></div></div></section>" +
      (w.length ? '<section class="bg-surface-container-lowest rounded-[22px] p-5 pr-soft flex flex-col gap-3.5"><div class="flex items-center justify-between"><div class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-secondary"></span><h2 class="font-headline-sm text-headline-sm text-primary">Decisions waiting for you</h2></div><span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">' + w.length + "</span></div>" +
        w.map(function (a) {
          var it = itemOf(e, a.item), lo = Math.min.apply(null, a.options.map(function (o) { return o.price; }));
          return '<div class="bg-surface-container-low rounded-xl p-4 flex flex-col gap-3"><div class="flex items-center justify-between gap-2"><span class="flex items-center gap-1.5 font-label-sm text-label-sm text-secondary font-bold">' + ic(CAT_ICON[it.cat], "text-[16px]") + esc(it.cat) + ' quote</span><span class="font-label-sm text-label-sm text-error font-bold">Due ' + fmtDate(a.deadline) + "</span></div>" +
            '<h3 class="font-title-md text-title-md text-on-surface font-semibold">' + a.options.map(function (o) { return esc(vendor(o.vendor).name); }).join(" vs. ") + "</h3>" +
            '<div class="flex items-center justify-between gap-2"><span class="font-body-sm text-body-sm text-outline italic">From ' + short(lo) + '</span><a href="#client-decision-' + a.id + '" class="' + BTN + '">Review &amp; choose' + ic("arrow_forward", "text-title-md") + "</a></div></div>";
        }).join("") + "</section>"
        : '<section class="bg-surface-container-lowest rounded-[22px] p-5 pr-soft flex items-center gap-3">' + ic("task_alt", "text-tertiary", true) + '<p class="font-body-sm text-body-sm text-on-surface">You\'re all caught up. ' + PLANNER.first + " will send the next choice here.</p></section>") +
      '<section class="bg-surface-container-lowest rounded-[22px] p-5 pr-soft flex flex-col gap-3.5"><div class="flex items-center justify-between"><div class="flex flex-col"><span class="font-label-sm text-label-sm text-secondary font-bold">Bookings</span><h2 class="font-headline-sm text-headline-sm text-primary">Readiness</h2></div><span class="font-title-md text-title-md font-bold text-secondary">' + pct + "%</span></div>" +
        '<div class="flex items-center gap-4 bg-surface-container-low p-3 rounded-lg"><div class="relative w-16 h-16 shrink-0 flex items-center justify-center"><svg class="w-full h-full -rotate-90" viewBox="0 0 36 36" aria-hidden="true"><path class="text-surface-variant" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3.5"></path><path class="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="' + pct + ', 100" stroke-linecap="round" stroke-width="3.5"></path></svg><span class="absolute font-label-md text-label-md font-bold text-primary">' + m.confirmed + "/" + m.total + "</span></div>" +
          '<div class="flex flex-col min-w-0"><p class="font-title-md text-title-md text-primary font-semibold leading-tight">' + m.confirmed + " of " + m.total + ' bookings confirmed</p><p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">' + (m.total - m.confirmed) + " still in progress with " + PLANNER.first + ".</p></div></div>" +
        '<div class="grid grid-cols-3 gap-2">' + [["Locked", m.confirmed, "bg-surface-container", "text-primary"], ["In review", m.review, "bg-secondary-container/40", "text-secondary"], ["To go", m.total - m.confirmed - m.review, "bg-surface-container", "text-outline"]].map(function (x) { return '<div class="' + x[2] + ' rounded-lg p-2 flex flex-col items-center text-center"><span class="font-headline-sm text-headline-sm leading-tight ' + x[3] + '">' + x[1] + '</span><span class="font-label-sm text-label-sm text-on-surface-variant font-medium mt-0.5">' + x[0] + "</span></div>"; }).join("") + "</div></section>" +
      '<section class="bg-surface-container-lowest rounded-[22px] p-5 pr-soft flex flex-col gap-3"><div class="flex items-start justify-between"><div class="flex flex-col"><span class="font-label-sm text-label-sm text-secondary font-bold">Treasury</span><h2 class="font-headline-sm text-headline-sm text-primary">Budget at a glance</h2></div><div class="text-right"><span class="font-label-sm text-label-sm text-outline">Cap</span><div class="font-title-md text-title-md text-primary font-bold tabular-nums">' + naira(e.budget) + "</div></div></div>" +
        '<div class="grid grid-cols-2 gap-2 bg-surface-container-low rounded-lg p-3"><div><span class="font-label-sm text-label-sm text-outline">Committed (' + Math.round(m.pct) + '%)</span><div class="font-headline-sm text-headline-sm text-primary font-bold tabular-nums">' + naira(m.committed) + '</div></div><div><span class="font-label-sm text-label-sm text-outline">Available</span><div class="font-headline-sm text-headline-sm text-secondary font-bold tabular-nums">' + naira(m.remaining) + "</div></div></div>" +
        '<div class="w-full h-2.5 bg-surface-container rounded-full overflow-hidden"><div class="h-full bg-primary-container rounded-full" style="width:' + m.pct.toFixed(1) + '%"></div></div><a href="#client-budget" class="w-full text-center py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container font-label-md text-label-md text-primary font-semibold">View full budget</a></section>' +
      pFamily(e) + '<section class="bg-surface-container-lowest rounded-[22px] p-5 pr-soft flex flex-col gap-3"><h2 class="font-headline-sm text-headline-sm text-primary">From your planner</h2>' + S.activity.slice(0, 4).map(function (x) { return '<div class="flex gap-3">' + ic(x.icon, "text-secondary text-[20px] mt-0.5") + '<div class="flex flex-col"><span class="font-body-sm text-body-sm text-on-surface">' + esc(x.text) + '</span><span class="font-label-sm text-label-sm text-outline">' + esc(x.when) + "</span></div></div>"; }).join("") +
        '<div class="flex items-center justify-between gap-2 bg-surface-container-low rounded-xl p-3 mt-1"><span class="flex flex-col"><span class="font-label-md text-label-md text-on-surface font-semibold">Message ' + PLANNER.first + ' on WhatsApp</span><span class="font-body-sm text-body-sm text-on-surface-variant select-all tabular-nums">' + PLANNER.phone + '</span></span><button class="font-label-md text-label-md text-tertiary font-bold" data-act="copy" data-id="' + PLANNER.phone + '">Copy</button></div></section>';
  }
  function pWelcome(e) {
    return '<section class="relative rounded-[28px] overflow-hidden h-72 pr-soft">' + photo(e.img, "absolute inset-0 w-full h-full", "celebration", "") + '<div class="absolute inset-0 bg-gradient-to-t from-[#000000]/80 to-transparent"></div><div class="absolute bottom-0 p-6 text-white flex flex-col gap-1"><span class="text-[14px] font-semibold text-gold">' + fmtDate(e.date, true) + '</span><h1 class="text-[30px] leading-tight font-bold tracking-[-0.03em]">' + esc(e.name) + "</h1></div></section>" +
      '<section class="flex flex-col gap-3"><div class="flex items-center gap-3">' + photo("planner-portrait", "w-12 h-12 rounded-full", "person", "") + '<p class="text-[15px] text-on-surface"><b>' + PLANNER.name + "</b> invited you to follow your celebration on Party Riders.</p></div>" +
        '<ul class="flex flex-col gap-3 text-[15px] text-on-surface-variant">' + [["event_available", "See every booking as it's confirmed"], ["task_alt", "Approve vendors and quotes from your phone"], ["account_balance_wallet", "Track your budget in naira, live"], ["group", "Bring in family to follow along"]].map(function (x) { return '<li class="flex gap-3 items-center">' + ic(x[0], "text-plum text-[22px]") + x[1] + "</li>"; }).join("") + "</ul></section>" +
      '<button class="' + BTN + ' w-full py-3 text-[16px]" data-act="accept-invite" data-ev="' + e.id + '">Accept &amp; open my portal</button><p class="text-center text-[12px] text-outline">Signing in with ' + esc(e.client.phone) + " on WhatsApp</p>";
  }
  function pFamily(e) {
    return '<section class="bg-surface-container-lowest rounded-[22px] p-5 pr-soft flex flex-col gap-3"><div class="flex items-center justify-between"><h2 class="font-headline-sm text-headline-sm text-primary">Your family</h2><span class="text-[13px] text-outline">' + e.members.length + " added</span></div>" +
      e.members.map(function (m) { return '<div class="flex items-center gap-3"><div class="w-9 h-9 rounded-full bg-surface-container text-[12px] font-semibold flex items-center justify-center">' + initials(m.name) + '</div><div class="flex-1 min-w-0"><div class="text-[15px] font-semibold text-on-surface">' + esc(m.name) + '</div><div class="text-[13px] text-outline">' + esc(m.rel) + " · " + (m.role === "approver" ? "Can approve" : "View only") + "</div></div>" + inviteChip(m.status) + "</div>"; }).join("") +
      (ui.famOpen ? '<form id="fam-form" data-ev="' + e.id + '" class="flex flex-col gap-2 pt-2 border-t border-surface-container" novalidate><label for="fm-name" class="' + LABEL + '">Name</label><input id="fm-name" class="' + INPUT + '" placeholder="e.g. Tunde Bakare"><label for="fm-rel" class="' + LABEL + '">Relationship</label><input id="fm-rel" class="' + INPUT + '" placeholder="e.g. Sister"><label for="fm-phone" class="' + LABEL + '">WhatsApp number</label><input id="fm-phone" type="tel" class="' + INPUT + '" placeholder="+234 …"><label class="flex items-center gap-2 text-[14px] text-on-surface pt-1"><input type="checkbox" id="fm-approve" class="rounded text-plum focus:ring-plum"> Can approve decisions</label><p id="fm-err" role="alert" class="text-[13px] text-error"></p><div class="flex gap-2"><button type="submit" class="' + BTN + '">Send invite</button><button type="button" class="' + BTN_SOFT + '" data-act="fam-toggle">Cancel</button></div></form>'
        : '<button class="' + BTN_SOFT + ' self-start" data-act="fam-toggle">' + ic("person_add", "text-[18px]") + "Invite family</button>") + "</section>";
  }
  function pDecisions(e) {
    var list = S.approvals.filter(function (a) { return a.event === e.id && a.status !== "draft"; });
    var w = list.filter(function (a) { return a.status === "sent"; }), done = list.filter(function (a) { return a.status === "approved"; });
    function row(a) {
      var it = itemOf(e, a.item);
      return '<a href="#client-decision-' + a.id + '" class="flex items-center justify-between gap-3 bg-surface-container-lowest rounded-[22px] p-5 pr-soft"><span class="flex items-center gap-3 min-w-0"><span class="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center shrink-0">' + ic(CAT_ICON[it.cat]) + '</span><span class="flex flex-col min-w-0"><span class="font-title-md text-title-md text-on-surface font-semibold">' + esc(it.cat) + '</span><span class="font-body-sm text-body-sm text-outline truncate">' +
        (a.status === "approved" ? "You chose " + esc(vendor(a.options[a.chosen].vendor).name) : a.options.length + " options · due " + fmtDate(a.deadline)) + "</span></span></span>" + ic("chevron_right", "text-outline") + "</a>";
    }
    return '<h1 class="font-headline-xl-mobile text-headline-xl-mobile text-primary tracking-tight">Approvals</h1>' +
      '<section class="flex flex-col gap-3"><h2 class="font-label-sm text-label-sm text-secondary font-bold">Waiting for you</h2>' + (w.length ? w.map(row).join("") : '<p class="bg-surface-container-lowest rounded-[22px] p-5 pr-soft font-body-sm text-body-sm text-on-surface-variant">Nothing waiting. ' + PLANNER.first + " will send the next choice here.</p>") + "</section>" +
      (done.length ? '<section class="flex flex-col gap-3"><h2 class="font-label-sm text-label-sm text-outline font-bold">Decided</h2>' + done.map(row).join("") + "</section>" : "");
  }
  function pDecision(e, id) {
    var a = apprById(id);
    if (!a || a.status === "draft") return '<div class="bg-surface-container-lowest rounded-xl p-6 shadow-sm text-center flex flex-col gap-3 items-center">' + ic("task_alt", "text-[40px] text-outline-variant") + '<p class="font-body-sm text-body-sm text-on-surface-variant">This decision isn\'t available.</p><a class="' + BTN + '" href="#client-decisions">All approvals</a></div>';
    var it = itemOf(e, a.item);
    var head = '<a href="#client-decisions" class="self-start flex items-center gap-1 font-label-md text-label-md text-primary font-semibold">' + ic("arrow_back", "text-title-md") + "Approvals</a>" +
      '<div class="flex flex-col gap-1"><span class="font-label-sm text-label-sm text-secondary font-bold">Decision · ' + esc(it.cat) + '</span><h1 class="font-headline-xl-mobile text-headline-xl-mobile text-primary tracking-tight">' + esc(it.name) + '</h1><p class="font-body-sm text-body-sm text-on-surface-variant">' + esc(e.short) + " · " + e.guests + " guests · Cap " + naira(it.est) + "</p><p class=\"text-[13px] text-outline mt-1\">Can approve: " + [e.client.short].concat(e.members.filter(function (m) { return m.role === "approver"; }).map(function (m) { return m.name.split(" ")[0]; })).map(esc).join(", ") + "</p></div>" +
      '<section class="bg-surface-container-lowest rounded-[22px] p-5 pr-soft flex flex-col gap-3"><div class="flex items-center gap-3">' + photo("planner-portrait", "w-11 h-11 rounded-full", "person", "") + '<div class="flex-1"><div class="font-title-md text-title-md text-on-surface font-semibold">' + PLANNER.name + '</div><div class="font-label-sm text-label-sm text-secondary font-bold">Lead Planner</div></div></div><p class="font-body-sm text-body-sm text-on-surface-variant italic">“' + esc(a.note) + "”</p></section>";
    if (a.status === "approved") {
      var o = a.options[a.chosen], v = vendor(o.vendor);
      return head + '<section class="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col items-center gap-2 text-center">' + ic("verified", "text-[44px] text-tertiary", true) + '<h2 class="font-headline-sm text-headline-sm text-primary">' + esc(v.name) + " is locked in</h2><p class=\"font-body-sm text-body-sm text-on-surface-variant\">" + naira(o.price) + ". " + PLANNER.first + " has been notified and will share the contract.</p></section>" +
        '<a href="#client-home" class="' + BTN_SOFT + '">Back to home</a>';
    }
    return head + '<h2 class="font-title-md text-title-md text-primary font-bold flex items-center gap-2">' + ic(CAT_ICON[it.cat], "text-secondary") + "Vendor comparison</h2>" + a.options.map(function (o, idx) {
      var v = vendor(o.vendor), rec = a.rec === idx, conf = ui.confirm && ui.confirm.id === a.id && ui.confirm.idx === idx, pts = o.points || v.points;
      return '<article class="bg-surface-container-lowest rounded-[22px] pr-soft overflow-hidden ' + (rec ? "ring-2 ring-gold" : "") + '">' +
        '<div class="relative h-40">' + photo(o.img || v.img, "absolute inset-0 w-full h-full", CAT_ICON[v.cat], v.name) + "</div>" +
        '<div class="p-4 flex flex-col gap-3"><div class="flex items-start justify-between gap-2"><div class="flex flex-col"><span class="self-start font-label-sm text-label-sm px-2 py-0.5 rounded-full font-bold mb-1 ' + (rec ? "bg-gold text-white" : "bg-surface-container text-on-surface-variant") + '">' + (rec ? "★ Planner's pick" : "Option " + String.fromCharCode(65 + idx)) + '</span><h3 class="font-headline-sm text-headline-sm text-primary font-bold">' + esc(v.name) + '</h3><span class="flex items-center gap-1 font-label-md text-label-md text-on-surface">' + ic("star", "text-[16px] text-gold", true) + v.rating + ' <span class="text-outline font-normal">(' + v.jobs + " weddings with us)</span></span></div></div>" +
          '<div class="flex items-end justify-between bg-surface-container-low rounded-lg px-3 py-2"><span class="font-currency-md text-currency-md text-primary font-bold tabular-nums">' + naira(o.price) + '</span><span class="font-label-md text-label-md text-outline tabular-nums">' + naira(Math.round(o.price / e.guests)) + " / guest</span></div>" +
          '<ul class="flex flex-col gap-1.5">' + pts.map(function (p) { return '<li class="flex gap-2 font-body-sm text-body-sm text-on-surface-variant">' + ic("check_circle", "text-[16px] text-tertiary") + esc(p) + "</li>"; }).join("") + "</ul>" +
          (conf ? '<div class="border-t border-dashed border-outline-variant pt-3 flex flex-col gap-2"><p class="font-body-sm text-body-sm text-on-surface font-semibold">Approve ' + esc(v.name) + " for " + naira(o.price) + '?</p><div class="flex gap-2"><button class="' + BTN + ' flex-1" data-act="approve" data-id="' + a.id + '" data-idx="' + idx + '">' + ic("lock", "text-title-md") + 'Yes, approve</button><button class="' + BTN_SOFT + '" data-act="cancel-confirm">Cancel</button></div></div>'
            : '<button class="' + (rec ? BTN : BTN_SOFT) + ' w-full py-3" data-act="choose" data-id="' + a.id + '" data-idx="' + idx + '">' + ic(rec ? "lock" : "swap_horiz", "text-title-md") + (rec ? "Approve " + esc(v.name) : "Choose " + esc(v.name)) + "</button>") +
        "</div></article>";
    }).join("") +
      '<section class="bg-surface-container-lowest rounded-[22px] p-5 pr-soft flex flex-col gap-2"><div class="flex justify-between font-label-md text-label-md"><span class="text-on-surface font-semibold">Budget cap for ' + esc(it.cat.toLowerCase()) + '</span><span class="text-primary font-bold tabular-nums">' + naira(it.est) + "</span></div>" +
        '<div class="w-full h-2.5 bg-surface-container rounded-full overflow-hidden"><div class="h-full bg-primary-container rounded-full" style="width:100%"></div></div><p class="font-label-sm text-label-sm text-outline">Both quotes ' + (a.options.every(function (o) { return o.price <= it.est; }) ? "fit inside the cap." : "were compared against the cap by " + PLANNER.first + ".") + "</p></section>";
  }
  function pBudget(e) {
    var m = money(e);
    return '<h1 class="font-headline-xl-mobile text-headline-xl-mobile text-primary tracking-tight">Budget</h1>' +
      '<section class="bg-surface-container-lowest rounded-[22px] p-5 pr-soft flex flex-col gap-3"><span class="font-label-sm text-label-sm text-outline font-semibold">Committed</span><span class="font-currency-display text-currency-display text-primary font-bold tabular-nums">' + naira(m.committed) + '</span><div class="w-full h-2.5 bg-surface-container rounded-full overflow-hidden"><div class="h-full bg-primary-container rounded-full" style="width:' + m.pct.toFixed(1) + '%"></div></div><div class="flex justify-between font-label-md text-label-md text-outline tabular-nums"><span>' + Math.round(m.pct) + "% of " + naira(e.budget) + "</span><span>" + naira(m.remaining) + " left</span></div></section>" +
      '<section class="bg-surface-container-lowest rounded-[22px] pr-soft divide-y divide-surface-container">' + e.items.map(function (i) {
        return '<div class="flex items-center justify-between gap-3 p-4"><span class="flex items-center gap-3 min-w-0"><span class="w-9 h-9 rounded-lg bg-secondary-container/30 text-secondary flex items-center justify-center shrink-0">' + ic(CAT_ICON[i.cat], "text-[18px]") + '</span><span class="flex flex-col min-w-0"><span class="font-body-sm text-body-sm font-semibold text-on-surface">' + esc(i.cat) + '</span><span class="font-label-sm text-label-sm text-outline truncate">' + (vendorName(i) ? esc(vendorName(i)) : "Not chosen yet") + '</span></span></span><span class="flex flex-col items-end"><span class="font-body-sm text-body-sm font-bold text-primary tabular-nums">' + naira(i.actual != null ? i.actual : i.est) + "</span>" + statusChip(i) + "</span></div>";
      }).join("") + "</section>";
  }

  // ---------- Guest RSVP ----------
  function viewRSVP() {
    var r = S.rsvp || {}, step = r.step || "invite", inner;
    if (step === "pass") {
      inner = '<div class="rounded-2xl bg-primary-container text-on-primary p-5 flex flex-col gap-4 shadow-xl"><div class="flex items-center justify-between"><span class="flex items-center gap-2"><span class="w-8 h-8 rounded-full bg-secondary-container text-primary flex items-center justify-center font-bold text-label-sm">A&amp;T</span><span class="flex flex-col"><span class="font-label-sm text-label-sm text-secondary-container font-bold">Party Riders</span><span class="font-label-md text-label-md">Wedding guest pass</span></span></span><span class="font-label-sm text-label-sm px-2 py-1 rounded-full bg-white/15 text-white font-bold">Guest</span></div>' +
        '<div><span class="font-label-sm text-label-sm text-on-primary/70">Ceremony &amp; banquet</span><h2 class="font-headline-md text-headline-md text-secondary-container font-bold">Adaeze &amp; Tunde</h2><p class="font-body-sm text-body-sm">Saturday, 12 Dec 2026 · 11:00 AM</p></div>' +
        '<div class="grid grid-cols-2 gap-3 border-t border-on-primary/20 pt-3"><div><span class="font-label-sm text-label-sm text-on-primary/70">Guest</span><div class="font-title-md text-title-md font-semibold">' + esc(r.name) + '</div></div><div class="text-right"><span class="font-label-sm text-label-sm text-on-primary/70">Seats</span><div class="font-title-md text-title-md font-semibold">' + r.seats + '</div></div><div><span class="font-label-sm text-label-sm text-on-primary/70">Venue</span><div class="font-body-sm text-body-sm font-semibold">Eko Pearl Event Centre</div></div><div class="text-right"><span class="font-label-sm text-label-sm text-on-primary/70">Pass ref</span><div class="font-title-md text-title-md font-bold text-secondary-container">' + esc(r.code) + "</div></div></div>" +
        '<p class="font-body-sm text-body-sm text-on-primary/80 bg-white/10 rounded-lg p-3">Show this pass at the door. Your table number arrives on WhatsApp a week before.</p></div>' +
        (r.aso ? '<div class="bg-surface-container-low rounded-xl p-4 font-body-sm text-body-sm text-on-surface"><b>Aso Ebi:</b> plum and champagne gold. The family will send payment details to ' + esc(r.phone) + ".</div>" : "") +
        '<button class="' + BTN_SOFT + '" data-act="rsvp-reset">Change my reply</button>';
    } else if (step === "declined") {
      inner = '<div class="flex flex-col items-center text-center gap-2 py-4">' + ic("favorite", "text-[40px] text-secondary", true) + '<h2 class="font-headline-sm text-headline-sm text-primary">Thank you for letting us know</h2><p class="font-body-sm text-body-sm text-on-surface-variant">Adaeze and Tunde will miss you and appreciate your wishes.</p></div><button class="' + BTN_SOFT + '" data-act="rsvp-reset">Change my reply</button>';
    } else {
      var acc = step === "details";
      inner = '<div class="grid grid-cols-2 gap-3" role="group" aria-label="Will you attend?">' +
          '<button data-act="rsvp-yes" aria-pressed="' + acc + '" class="p-3.5 rounded-lg flex flex-col items-center gap-1 border-2 transition-all ' + (acc ? "bg-primary text-on-primary border-primary" : "bg-surface-container-lowest border-outline-variant text-on-surface") + '">' + ic("celebration", "text-[22px]") + '<span class="font-label-md text-label-md font-bold">Joyfully accept</span></button>' +
          '<button data-act="rsvp-no" aria-pressed="false" class="p-3.5 rounded-lg flex flex-col items-center gap-1 border-2 bg-surface-container-lowest border-outline-variant text-on-surface">' + ic("mail", "text-[22px]") + '<span class="font-label-md text-label-md font-bold">Regretfully decline</span></button></div>' +
        (acc ? '<form id="rsvp-form" class="flex flex-col gap-3" novalidate><div class="flex flex-col gap-1"><label for="rv-name" class="' + LABEL + '">Your name</label><input id="rv-name" autocomplete="name" class="' + INPUT + '" placeholder="As it should appear on your pass" value="' + esc(r.name || "") + '"></div>' +
          '<div class="flex flex-col gap-1"><label for="rv-phone" class="' + LABEL + '">WhatsApp number</label><input id="rv-phone" type="tel" autocomplete="tel" class="' + INPUT + '" placeholder="+234 …" value="' + esc(r.phone || "") + '"></div>' +
          '<div class="flex items-center justify-between"><span class="' + LABEL + '">Seats</span><div class="inline-flex rounded-lg overflow-hidden border border-outline-variant">' + [1, 2].map(function (n) { var on = (r.seats || 1) === n; return '<button type="button" data-act="rsvp-seats" data-n="' + n + '" aria-pressed="' + on + '" class="px-5 py-2 font-label-md text-label-md font-bold ' + (on ? "bg-primary text-on-primary" : "bg-surface-container-lowest text-on-surface") + '">' + n + "</button>"; }).join("") + "</div></div>" +
          '<label class="flex items-center gap-2 font-body-sm text-body-sm text-on-surface"><input type="checkbox" id="rv-aso" class="rounded text-primary-container focus:ring-primary"' + (r.aso ? " checked" : "") + "> I'd like to order Aso Ebi</label>" +
          '<p id="rv-err" role="alert" class="font-body-sm text-body-sm text-error"></p><button type="submit" class="' + BTN + ' w-full py-3">' + ic("check_circle", "text-title-md") + "Confirm RSVP</button></form>" : "");
    }
    return (ui.from ? previewBar("the guest invitation") : "") +
      '<div class="min-h-screen bg-surface-container-low flex justify-center pr-gx py-space-lg"><article class="w-full max-w-[440px] bg-surface rounded-2xl shadow-xl overflow-hidden self-start" data-view>' +
        '<header class="relative bg-gradient-to-b from-surface-container-lowest to-surface-container-low px-6 pt-10 pb-8 text-center flex flex-col items-center gap-2"><div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary-container to-primary"></div>' +
          '<span class="font-label-sm text-label-sm tracking-[0.2em] text-secondary font-bold">Together with their families</span><h1 class="font-display-lg-mobile text-display-lg-mobile text-primary font-bold leading-tight">Adaeze <span class="text-secondary font-semibold">&amp;</span> Tunde</h1><p class="font-body-md text-body-md text-on-surface-variant">invite you to celebrate their wedding</p></header>' +
        '<div class="px-6 py-6 flex flex-col gap-5"><div class="flex flex-col gap-3">' +
          '<div class="flex gap-3">' + ic("calendar_month", "text-secondary") + '<div><div class="font-title-md text-title-md text-on-surface font-semibold">Saturday, 12 December 2026</div><div class="font-body-sm text-body-sm text-outline">Church service 11:00 AM · Reception 2:00 PM</div></div></div>' +
          '<div class="flex gap-3">' + ic("location_on", "text-secondary") + '<div><div class="font-title-md text-title-md text-on-surface font-semibold">Eko Pearl Event Centre</div><div class="font-body-sm text-body-sm text-outline">Lekki, Lagos</div></div></div>' +
          '<div class="flex gap-3">' + ic("styler", "text-secondary") + '<div class="flex flex-col gap-2"><div class="font-title-md text-title-md text-on-surface font-semibold">Aso Ebi: royal plum &amp; champagne gold</div><div class="flex gap-2"><span class="w-7 h-7 rounded-full bg-primary-container ring-2 ring-surface-container-lowest shadow"></span><span class="w-7 h-7 rounded-full bg-[#E9D3A3] ring-2 ring-surface-container-lowest shadow"></span><span class="w-7 h-7 rounded-full bg-secondary ring-2 ring-surface-container-lowest shadow"></span></div></div></div>' +
        '</div><div class="h-px bg-surface-container"></div>' + inner + '<p class="text-center font-label-sm text-label-sm text-outline">Kindly reply by 21 November 2026</p></div></article></div>';
  }

  // ---------- Interaction ----------
  document.addEventListener("error", function (evt) { var t = evt.target; if (t && t.tagName === "IMG" && t.hasAttribute("data-photo")) t.remove(); }, true);
  document.addEventListener("click", function (evt) {
    var el = evt.target.closest("[data-act]");
    if (!el || el.tagName === "SELECT") return;
    var act = el.dataset.act, id = el.dataset.id, r = route(), mm = r.match(/^(?:event|send)-([a-z0-9]+)-/), e = mm ? ev(mm[1]) : null;
    var layer = document.getElementById("layer");
    switch (act) {
      case "ev-filter": ui.evFilter = id; render(); break;
      case "task": var t = S.tasks.filter(function (x) { return x.id === id; })[0]; t.done = el.checked; save(); render(); break;
      case "item-cat": ui.itemCat = id; render(); break;
      case "guest-filter": ui.guestFilter = id; render(); break;
      case "vendor-cat": ui.vendorCat = id; render(); break;
      case "vendor-jump": ui.vendorCat = id; ui.search = ""; break;
      case "clear-search": ui.search = ""; break;
      case "add-item": evt.stopPropagation(); ui.pick.new = []; openItem(e, null); break;
      case "edit-item": evt.stopPropagation(); openItem(e, itemOf(e, id)); break;
      case "close-drawer": closeDrawer(); break;
      case "pick":
        var key = el.dataset.item, list = ui.pick[key] = ui.pick[key] || [], at = list.indexOf(id);
        if (el.checked && at < 0) list.push(id); else if (!el.checked && at >= 0) list.splice(at, 1);
        draft(); reopen(); break;
      case "book-direct":
        var be = ev(layer.dataset.event), bit = saveItemFromForm(be, layer.dataset.item || null);
        if (!bit) return;
        var vid = (ui.pick[el.dataset.item] || [])[0];
        bit.vendor = vid; bit.venue = ""; bit.status = "confirmed"; if (bit.actual == null) bit.actual = bit.est;
        ui.pick[el.dataset.item] = [];
        save(); closeDrawer(); render(); toast(vendor(vid).name + " booked for " + bit.cat.toLowerCase(), "handshake"); break;
      case "shortlist":
        var se = ev(layer.dataset.event), sit = saveItemFromForm(se, layer.dataset.item || null);
        if (!sit) return;
        var picks = ui.pick[el.dataset.item] || [];
        sit.status = "pending";
        S.approvals.push({ id: "a-" + sit.id, event: se.id, item: sit.id, status: "draft", rec: 0, chosen: null, deadline: "2026-11-20", whatsapp: true,
          note: "I've shortlisted " + picks.length + " vetted " + sit.cat.toLowerCase() + " options for you. Each one fits our plan; tell me which you prefer.",
          options: picks.map(function (p) { return { vendor: p, price: sit.est, img: vendor(p).img, points: null }; }) });
        ui.pick[el.dataset.item] = [];
        save(); closeDrawer(); go("send-" + se.id + "-" + sit.id); break;
      case "unassign":
        var ue = ev(layer.dataset.event), ui2 = itemOf(ue, id); ui2.vendor = null; ui2.status = "unbooked"; ui2.actual = null; save(); render(); openItem(ue, ui2); break;
      case "delete-item":
        var dl = ev(layer.dataset.event); dl.items = dl.items.filter(function (i) { return i.id !== id; }); S.approvals = S.approvals.filter(function (a) { return a.item !== id; }); save(); closeDrawer(); render(); toast("Item deleted", "delete"); break;
      case "client-view":
        S.portal = el.dataset.ev || (id && apprById(id) ? apprById(id).event : null) || (e ? e.id : "adaeze"); save();
        ui.from = r; go(el.dataset.welcome ? "client-welcome" : id ? "client-decision-" + id : "client-home"); break;
      case "invite-client":
        var ie = ev(el.dataset.ev); var again = ie.client.invite === "sent"; ie.client.invite = "sent"; ie.client.sent = "3 Nov"; save(); render(); toast((again ? "Invite resent to " : "Invite sent to ") + ie.client.short + " on WhatsApp", "send"); break;
      case "accept-invite":
        var ae2 = ev(el.dataset.ev); ae2.client.invite = "accepted"; S.activity.unshift({ icon: "waving_hand", text: ae2.client.short + " joined the portal", when: "Just now" }); save(); go("client-home"); toast("Welcome, " + ae2.client.short, "celebration"); break;
      case "member-resend": toast("Invite resent on WhatsApp", "send"); break;
      case "member-remove":
        var re = ev(el.dataset.ev); re.members = re.members.filter(function (m) { return m.id !== id; }); save(); render(); toast("Removed", "person_remove"); break;
      case "note-delete":
        var ne2 = ev(el.dataset.ev); ne2.notes = ne2.notes.filter(function (n) { return n.id !== id; }); save(); render(); break;
      case "fam-toggle": ui.famOpen = !ui.famOpen; render(); break;
      case "task-filter": ui.taskEvent = id; render(); break;
      case "add-vendor": openVendorForm(); break;
      case "client-vendor":
        var cn = document.getElementById("cv-name").value.trim(), cp = document.getElementById("cv-phone").value.trim();
        if (!cn) { document.getElementById("f-err").textContent = "Add the client's vendor name."; return; }
        var ce = ev(layer.dataset.event), cit = saveItemFromForm(ce, layer.dataset.item || null);
        if (!cit) return;
        cit.vendor = null; cit.venue = cn + " (client's vendor)"; cit.status = "pending"; cit.contact = cp;
        save(); closeDrawer(); render(); toast(cn + " added as the client's vendor", "storefront"); break;
      case "preview-rsvp": ui.from = r; go("rsvp"); break;
      case "remind": S.guests.reminded = true; save(); render(); toast("Reminders queued for " + S.guests.stats.pending + " guests on WhatsApp", "chat"); break;
      case "set-rec": apprById(id).rec = +el.dataset.idx; save(); render(); break;
      case "toggle-wa": apprById(id).whatsapp = el.checked; save(); break;
      case "send-approval":
        var sa = apprById(id); sa.status = "sent";
        var se2 = ev(sa.event), sit2 = itemOf(se2, sa.item);
        S.tasks.forEach(function (x) { if (x.go === "send-" + se2.id + "-" + sit2.id) x.done = true; });
        S.activity.unshift({ icon: "how_to_vote", text: PLANNER.first + " sent " + sa.options.length + " " + sit2.cat.toLowerCase() + " options for your approval", when: "Just now" });
        save(); render(true); toast("Sent to " + se2.client.short + (sa.whatsapp ? " with a WhatsApp link" : ""), "outgoing_mail"); break;
      case "choose": ui.confirm = { id: id, idx: +el.dataset.idx }; render(); break;
      case "cancel-confirm": ui.confirm = null; render(); break;
      case "approve":
        var aa = apprById(id), o = aa.options[+el.dataset.idx], ae = ev(aa.event), ait = itemOf(ae, aa.item);
        aa.status = "approved"; aa.chosen = +el.dataset.idx; ui.confirm = null;
        ait.vendor = o.vendor; ait.venue = ""; ait.est = ait.est || o.price; ait.actual = o.price; ait.status = "confirmed";
        S.activity.unshift({ icon: "verified", text: "You approved " + vendor(o.vendor).name + " (" + naira(o.price) + ")", when: "Just now" });
        save(); render(true); toast(PLANNER.first + " has been notified. " + vendor(o.vendor).name + " is locked in.", "verified"); break;
      case "copy":
        var done = function () { toast("Number copied", "content_copy"); };
        var fallback = function () { var n = el.parentElement && el.parentElement.querySelector(".select-all"); if (n) { var rg = document.createRange(); rg.selectNodeContents(n); var s = getSelection(); s.removeAllRanges(); s.addRange(rg); toast("Number selected. Copy it with your keyboard.", "content_copy"); } };
        try { navigator.clipboard.writeText(id).then(done, fallback); } catch (x) { fallback(); }
        break;
      case "rate": e.closeout.ratings[el.dataset.vendor] = +el.dataset.n; save(); render(); break;
      case "tpl-share": e.closeout.share = el.checked; save(); break;
      case "close-event":
        var c = e.closeout; e.closed = true;
        S.templates.unshift({ id: "t-" + e.id, name: c.template, type: e.type, guests: Math.round(e.guests * .85) + "–" + Math.round(e.guests * 1.1), budget: short(e.budget * .8) + "–" + short(e.budget * 1.2), lead: "2–4 months", style: "Buffet", img: e.img, blurb: "",
          parts: e.items.map(function (i) { return [i.cat, i.name, (i.actual || i.est) / e.budget]; }), from: e.name });
        S.tasks.forEach(function (x) { if (x.event === e.id) x.done = true; });
        save(); go("templates"); toast("Event closed and saved as a template", "inventory_2"); break;
      case "use-template": ui.newEvent = { step: 2, type: S.templates.filter(function (x) { return x.id === id; })[0].type, tpl: id }; go("new-event"); break;
      case "ne-type": ui.newEvent.type = id; var f = S.templates.filter(function (x) { return x.type === id; })[0]; ui.newEvent.tpl = f ? f.id : null; render(); break;
      case "ne-tpl": ui.newEvent.tpl = id; render(); break;
      case "ne-next": ui.newEvent.step = 2; render(true); break;
      case "ne-back": ui.newEvent.form = readNE(); ui.newEvent.step = 1; render(true); break;
      case "rsvp-yes": S.rsvp = Object.assign({}, S.rsvp, { step: "details", seats: (S.rsvp && S.rsvp.seats) || 1 }); save(); render(); break;
      case "rsvp-no": S.rsvp = { step: "declined" }; save(); render(); break;
      case "rsvp-seats": keepRSVP(); S.rsvp.seats = +el.dataset.n; save(); render(); break;
      case "rsvp-reset": S.rsvp = null; save(); render(); break;
      case "reset": try { localStorage.removeItem(KEY); } catch (x) { /* ignore */ } S = seed(); enrich(); ui.itemCat = "All"; ui.evFilter = "All"; ui.newEvent = { step: 1, type: "Wedding", tpl: "owambe" }; go("events"); toast("Sample data restored", "restart_alt"); break;
    }
  });
  function keepRSVP() { var n = document.getElementById("rv-name"), p = document.getElementById("rv-phone"), a = document.getElementById("rv-aso"); if (n) S.rsvp.name = n.value; if (p) S.rsvp.phone = p.value; if (a) S.rsvp.aso = a.checked; }
  function readNE() { var g = function (id) { var n = document.getElementById(id); return n ? n.value.trim() : ""; }; var inv = document.getElementById("ne-invite"); return { name: g("ne-name"), client: g("ne-client"), phone: g("ne-phone"), date: g("ne-date"), venue: g("ne-venue"), guests: g("ne-guests"), budget: g("ne-budget"), pkg: g("ne-pkg"), fee: g("ne-fee"), invite: inv ? inv.checked : true }; }
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") { closeDrawer(); if (ui.search) { ui.search = ""; render(); } }
    if ((evt.key === "Enter" || evt.key === " ") && evt.target.matches("tr[data-act]")) { evt.preventDefault(); evt.target.click(); }
  });
  document.addEventListener("input", function (evt) {
    var el = evt.target, k = el.dataset.input;
    if (!k) return;
    var keep = function () { var n = document.getElementById(el.id); if (n) { n.focus(); try { n.setSelectionRange(n.value.length, n.value.length); } catch (x) { /* number/date */ } } };
    if (k === "global-q") { ui.search = el.value; render(); keep(); }
    else if (k === "item-q") { ui.itemQuery = el.value; render(); keep(); }
    else if (k === "guest-q") { ui.guestQuery = el.value; render(); keep(); }
    else if (k === "vendor-q") { ui.vendorQuery = el.value; render(); keep(); }
    else if (k === "note") { apprById(el.dataset.id).note = el.value; save(); }
    else if (k === "deadline") { apprById(el.dataset.id).deadline = el.value; save(); }
    else if (k === "quote") { apprById(el.dataset.id).options[+el.dataset.idx].price = +el.value || 0; save(); }
    else if (k === "ne-field") { if (el.id === "ne-name" || el.id === "ne-client") { var bubble = document.querySelector("#ne-form .bg-\\[\\#E7F7EE\\]"); var d = readNE(); if (bubble) bubble.textContent = "Hi " + ((d.client || "your client").split(" ")[0]) + "! Your Party Riders portal for " + (d.name || "your celebration") + " is ready. Follow every booking and approve choices from your phone. — " + PLANNER.first; } }
    else if (k === "tpl-name") { var te = ev(el.dataset.id), was = !!te.closeout.template.trim(); te.closeout.template = el.value; save(); if (was !== !!el.value.trim()) { render(); keep(); } }
    else if (k === "lessons") { var le = ev(el.dataset.id), was2 = !!le.closeout.lessons.trim(); le.closeout.lessons = el.value; save(); if (was2 !== !!el.value.trim()) { render(); keep(); } }
  });
  document.addEventListener("change", function (evt) {
    var el = evt.target;
    if (el.dataset.input === "quote") render();
    if (el.dataset.act === "member-role") { var me = ev(el.dataset.ev); me.members.forEach(function (m) { if (m.id === el.dataset.id) m.role = el.value; }); save(); toast("Access updated", "manage_accounts"); }
    if (el.dataset.act === "eng-pkg") { ev(el.dataset.ev).eng.pkg = el.value; save(); toast("Package updated", "workspace_premium"); }
    if (el.dataset.input === "eng-fee") { ev(el.dataset.ev).eng.fee = +el.value || 0; save(); render(); }
  });
  document.addEventListener("submit", function (evt) {
    evt.preventDefault();
    var f = evt.target, layer = document.getElementById("layer");
    if (f.id === "member-form" || f.id === "fam-form") {
      var pre = f.id === "member-form" ? "mb" : "fm", me2 = ev(f.dataset.ev);
      var nm2 = document.getElementById(pre + "-name").value.trim(), ph2 = document.getElementById(pre + "-phone").value.trim(), rel2 = document.getElementById(pre + "-rel").value.trim();
      var role2 = f.id === "member-form" ? document.getElementById("mb-role").value : (document.getElementById("fm-approve").checked ? "approver" : "viewer");
      if (!nm2 || ph2.replace(/\D/g, "").length < 10) { document.getElementById(pre + "-err").textContent = !nm2 ? "Add their name." : "Add a WhatsApp number we can reach them on."; return; }
      me2.members.push({ id: "m" + Date.now().toString(36), name: nm2, rel: rel2 || "Family", phone: ph2, role: role2, status: "invited" });
      if (f.id === "fam-form") { ui.famOpen = false; S.activity.unshift({ icon: "group_add", text: "You invited " + nm2.split(" ")[0] + " to follow along", when: "Just now" }); }
      save(); render(); toast("Invite sent to " + nm2.split(" ")[0] + " on WhatsApp", "person_add"); return;
    }
    if (f.id === "note-form") {
      var nt = document.getElementById("note-text").value.trim(); if (!nt) return;
      ev(f.dataset.ev).notes.unshift({ id: "n" + Date.now().toString(36), text: nt, when: "Just now" }); save(); render(); toast("Note added", "note_add"); return;
    }
    if (f.id === "pay-form") {
      var amt = +document.getElementById("pay-amt").value; if (!(amt > 0)) return;
      var pe = ev(f.dataset.ev); pe.eng.paid += amt; save(); render(); toast(naira(amt) + " recorded. " + payState(pe.eng), "payments"); return;
    }
    if (f.id === "vendor-form") {
      var vn2 = document.getElementById("vf-name").value.trim(), vc = document.getElementById("vf-cat").value;
      if (!vn2) { document.getElementById("vf-err").textContent = "Add the business name."; return; }
      S.vendorsExtra.push({ id: "x" + Date.now().toString(36), name: vn2, cat: vc, area: document.getElementById("vf-area").value.trim() || "Lagos", price: document.getElementById("vf-price").value.trim() || "Quote on request", rating: 0, reviews: 0, jobs: 0, img: null,
        blurb: "Added to the roster by " + PLANNER.first + ".", tags: ["New to roster"], points: ["Quote on request", "Vetting in progress"], phone: document.getElementById("vf-phone").value.trim() });
      ui.vendorCat = "All"; save(); closeDrawer(); render(); toast(vn2 + " added to the roster", "storefront"); return;
    }
    if (f.id === "item-form") {
      var e = ev(layer.dataset.event), wasNew = !layer.dataset.item, it = saveItemFromForm(e, layer.dataset.item || null);
      if (!it) return;
      save(); closeDrawer(); render(); toast(wasNew ? "Planning item added" : "Changes saved");
    } else if (f.id === "ne-form") {
      var d = readNE(), err = document.getElementById("ne-err");
      if (!d.name || !d.client || !d.date || !d.venue || !(+d.guests > 0) || !(+d.budget > 0)) { err.textContent = "Fill in every field. Guests and budget need numbers."; ui.newEvent.form = d; return; }
      var t = S.templates.filter(function (x) { return x.id === ui.newEvent.tpl; })[0], id = "e" + Date.now().toString(36), type = ui.newEvent.type;
      S.events.push({ id: id, name: d.name, short: d.name.replace(/'s (Wedding|Birthday).*$/, ""), type: type, date: d.date, venue: d.venue, guests: +d.guests, budget: +d.budget, img: t ? t.img : null,
        client: { name: d.client, short: d.client.split(" ")[0], phone: d.phone || "—", invite: d.invite ? "sent" : "none", sent: d.invite ? "3 Nov" : "" }, members: [], notes: [], eng: { pkg: d.pkg || "Full planning", fee: +d.fee || 0, paid: 0 },
        items: (t ? t.parts : [["Venue", "Venue", .3]]).map(function (p, i) { return { id: id + "-" + i, cat: p[0], name: p[1], vendor: null, venue: "", est: Math.round(+d.budget * p[2] / 1000) * 1000, actual: null, status: "unbooked" }; }) });
      S.tasks.unshift({ id: "t" + id, text: "Find vendors for " + d.name, event: id, go: "event-" + id + "-plan", due: "Today", time: "", pri: "", done: false });
      ui.newEvent = { step: 1, type: "Wedding", tpl: "owambe" };
      save(); go("event-" + id + "-plan"); toast("Event created" + (d.invite ? ". Portal invite sent to " + d.client.split(" ")[0] : ""));
    } else if (f.id === "rsvp-form") {
      var nm = document.getElementById("rv-name").value.trim(), ph = document.getElementById("rv-phone").value.trim();
      if (!nm || ph.replace(/\D/g, "").length < 10) { document.getElementById("rv-err").textContent = !nm ? "Add your name for the pass." : "Add a WhatsApp number we can reach you on."; return; }
      S.rsvp = { step: "pass", name: nm, phone: ph, seats: S.rsvp.seats || 1, aso: document.getElementById("rv-aso").checked, code: "PR-LAG-" + (100 + Math.floor(Math.random() * 899)) };
      save(); render(true);
    }
  });
  render(true);
})();
