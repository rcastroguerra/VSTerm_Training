from googletrans import Translator
import nbformat

translator = Translator()
input_file = "VSTerm_Training.ipynb"
output_file = "VSTerm_Training_ES.ipynb"

# Cargar notebook
with open(input_file, "r", encoding="utf-8") as f:
    nb = nbformat.read(f, as_version=4)

for cell in nb.cells:
    if cell.cell_type == 'markdown':
        lines = cell.source.split("\n")
        translated_lines = []
        for line in lines:
            if line.strip() == "":
                translated_lines.append("")
            else:
                try:
                    # Escapar temporalmente símbolos problemáticos
                    safe_line = line.replace("*", "ASTERISCO").replace("#", "NUMERAL").replace(">", "MAYOR").replace("<", "MENOR")
                    translation = translator.translate(safe_line, src='en', dest='es')
                    
                    if translation is not None and translation.text is not None:
                        # Restaurar los símbolos originales
                        translated_text = translation.text.replace("ASTERISCO", "*").replace("NUMERAL", "#").replace("MAYOR", ">").replace("MENOR", "<")
                        translated_lines.append(translated_text)
                    else:
                        # Si falla, mantener la línea original
                        translated_lines.append(line)
                        print(f"⚠️ Traducción vacía, se mantiene la original: {line}")
                except Exception as e:
                    print(f"⚠️ No se pudo traducir: {line}\nError: {e}")
                    translated_lines.append(line)  # Mantener original si falla
        cell.source = "\n".join(translated_lines)

# Guardar notebook traducido
with open(output_file, "w", encoding="utf-8") as f:
    nbformat.write(nb, f)

print(f"Notebook traducido creado: {output_file}")