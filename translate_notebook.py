from googletrans import Translator

translator = Translator()
input_file = "VSTerm_Training.ipynb"
output_file = "VSTerm_Training_ES.ipynb"

import nbformat

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
                    translation = translator.translate(line, src='en', dest='es')
                    translated_lines.append(translation.text)
                except Exception as e:
                    print(f"⚠️ No se pudo traducir: {line}\nError: {e}")
                    translated_lines.append(line)  # Mantener original si falla
        cell.source = "\n".join(translated_lines)

with open(output_file, "w", encoding="utf-8") as f:
    nbformat.write(nb, f)

print(f"Notebook traducido creado: {output_file}")