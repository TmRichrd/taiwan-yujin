import defaultSettings from "@/settings";

const title = defaultSettings.title || "霧區閃光黃燈管理平台";

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
