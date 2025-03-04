const isValidImage = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
};

const fetchDisneyCharacters = async () => {
  try {
    const randomPage = Math.floor(Math.random() * 149) + 1;
    const response = await fetch(
      `https://api.disneyapi.dev/character?page=${randomPage}`
    );
    const data = await response.json();

    if (!data.data || data.data.length === 0)
      throw new Error("No characters found");

    const shuffled = data.data.sort(() => Math.random() - 0.5);
    const validCharacters = [];

    for (const char of shuffled) {
      if (validCharacters.length >= 12) break;

      if (char.imageUrl) {
        const isValid = await isValidImage(char.imageUrl);
        if (isValid) {
          validCharacters.push({ name: char.name, src: char.imageUrl });
        }
      }
    }

    return validCharacters;
  } catch (error) {
    console.error("Failed to fetch disney characters", error);
    return [];
  }
};

export default fetchDisneyCharacters;
