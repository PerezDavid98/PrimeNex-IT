/**
 * ISO 3166-1 alpha-2, currently assigned codes only.
 *
 * Names are NOT stored: Intl.DisplayNames renders them in the active locale
 * and Intl.Collator sorts them by that locale s rules, so the list is right in
 * all six languages without translating 250 names six times. Storing codes
 * also means the value that reaches the inbox is unambiguous whatever language
 * the visitor filled the form in.
 *
 * Withdrawn codes that CLDR still maps for backwards compatibility are
 * excluded: DD, SU, YU, CS, ZR, BU, DY, HV, NH, RH, TP, VD, YD, AN, FX and the
 * unofficial UK. Left in, they render as a second Germany, a second Benin and a
 * third Serbia in the dropdown.
 */
export const COUNTRY_CODES = ["AD","AE","AF","AG","AI","AL","AM","AO","AQ","AR","AS","AT","AU","AW","AX","AZ","BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BR","BS","BT","BV","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI","CK","CL","CM","CN","CO","CQ","CR","CU","CV","CW","CX","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE","EG","EH","ER","ES","ET","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU","GW","GY","HK","HM","HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IR","IS","IT","JE","JM","JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ","LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK","ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA","NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG","PH","PK","PL","PM","PN","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW","SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS","ST","SV","SX","SY","SZ","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO","TR","TT","TV","TW","TZ","UA","UG","UM","US","UY","UZ","VA","VC","VE","VG","VI","VN","VU","WF","WS","YE","YT","ZA","ZM","ZW"] as const;

export type CountryCode = (typeof COUNTRY_CODES)[number];

/** Localised, locale-sorted country options for a <select>. */
export function countryOptions(locale: string): { code: string; name: string }[] {
  const names = new Intl.DisplayNames([locale], { type: "region" });
  const collator = new Intl.Collator(locale);

  return COUNTRY_CODES.map((code) => ({ code, name: safeName(names, code) })).sort((a, b) =>
    collator.compare(a.name, b.name),
  );
}

function safeName(names: Intl.DisplayNames, code: string): string {
  try {
    return names.of(code) ?? code;
  } catch {
    return code;
  }
}
