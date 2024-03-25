export const openStreetMapTile = {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

export const mapBoxTile = {
  attribution:
    "Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>",
  url: `https://api.mapbox.com/styles/v1/${import.meta.env.VITE_USERNAME}/${
    import.meta.env.VITE_STYLE_ID
  }/tiles/256/{z}/{x}/{y}@2x?access_token=${import.meta.env.VITE_ACCESS_TOKEN}`,
};
