export default async function getThemeData() {
    try {
      const response = await fetch(`${process.env.STRAPI_API_URL}/api/website-setting`, {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_THEME_TOKEN}`,
        },
        cache: "no-store"
      });
    
      if (!response.ok) {
        console.error(`Fel vid hämtning av tema: ${response.status}`);
      }
    
      const json = await response.json();
      return json.data.theme;
    } catch (error) {
      console.error("Kunde inte hämta temadatan:", error);

      return "light";
    }
}