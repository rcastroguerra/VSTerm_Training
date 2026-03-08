from googletrans import Translator

input_file = "VSTerm_Training.md"
output_file = "VSTerm_Training_ES.md"

translator = Translator()

with open(input_file, "r", encoding="utf-8") as f:
    lines = f.readlines()

translated_lines = []

for line in lines:
    text = line.strip()

    if text == "":
        translated_lines.append("")
        continue

    try:
        result = translator.translate(text, src="en", dest="es")

        if result and result.text:
            translated_lines.append(result.text)
        else:
            translated_lines.append(text)

    except Exception as e:
        print(f"⚠️ No se pudo traducir: {text}")
        print("Error:", e)
        translated_lines.append(text)

with open(output_file, "w", encoding="utf-8") as f:
    f.write("\n".join(translated_lines))

print("✅ Traducción completada")