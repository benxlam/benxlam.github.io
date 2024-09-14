# Generate a full portfolio of all projects in the projects directory
# Must be run from the root directory of the project

import os
from docx import Document
from fpdf import FPDF
from docx2pdf import convert

projects_dir = 'projects/'

# List of subdirectories in the projects directory
subdirectories = [d for d in os.listdir(projects_dir) if os.path.isdir(os.path.join(projects_dir, d))]

# Now we can make the list of word documents in each subdirectory
project_word_doc_paths = []
for subdirectory in subdirectories:
    # Get the word documents in the subdirectory
    project_word_doc_paths.append(os.path.join(projects_dir, subdirectory, "project_page.docx"))

print(project_word_doc_paths)

word_doc = project_word_doc_paths[0]
print(word_doc)
convert(word_doc)

import pypandoc

output = pypandoc.convert_file(word_doc, 'pdf', outputfile='document.pdf')
assert output == ""
