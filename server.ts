import app from "./src";

const PORT = Number(process.env.PORT);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
