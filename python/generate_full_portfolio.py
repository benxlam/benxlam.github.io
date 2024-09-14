# Generate a full portfolio of all projects in the projects directory
# Must be run from the root directory of the project

import os
from pypdf import PdfReader, PdfWriter


projects_dir = 'projects/'
merged_pdf_name = "projects/BenjaminLam_FullPortfolio.pdf"

# List of subdirectories in the projects directory
subdirectories = [d for d in os.listdir(projects_dir) if os.path.isdir(os.path.join(projects_dir, d))]

# Now we can make the list of word documents in each subdirectory
project_pdf_paths = []
for subdirectory in subdirectories:
    # Get the word documents in the subdirectory
    project_pdf_paths.append(os.path.join(projects_dir, subdirectory, "project_page.pdf"))

print(project_pdf_paths)


merger = PdfWriter()

for pdf in project_pdf_paths:
    merger.append(pdf)
    print(f"Appended {pdf}")

merger.write(merged_pdf_name)
merger.close()

# # Now we can open the merged pdf and create a table of contents
# merged_pdf = PdfReader("merged-pdf.pdf")
# toc_merged_pdf = PdfWriter()

# toc_merged_pdf.add_blank_page(merged_pdf.pages[0].mediabox.width, merged_pdf.pages[0].mediabox.height)

# outline = merged_pdf.outline
# for o in outline:
#     print(o)
#     print()

# toc_merged_pdf.append("merged-pdf.pdf")
# toc_merged_pdf.write("merged-pdf-toc.pdf")


# from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
# from reportlab.lib.styles import getSampleStyleSheet

# def create_pdf_with_advanced_formatting(output_pdf):
#     doc = SimpleDocTemplate(output_pdf)
#     styles = getSampleStyleSheet()

#     # Print the avilable styles
#     print(styles.list())
    
    
#     content = []
    
#     # Heading
#     heading = Paragraph("My Heading", styles["Title"])
#     content.append(heading)
    
#     # Text
#     text = """This is a paragraph with <b>bold</b> and <i>italic</i> text.
#     Here is a list:\n\n
#     <ul>
#         <li>Item 1</li>
#         <li>Item 2</li>
#     </ul>"""
#     paragraph = Paragraph(text, styles["Code"])
#     content.append(paragraph)
    
#     # Add space
#     content.append(Spacer(1, 12))
    
#     # Another paragraph
#     additional_text = "Additional paragraph text here."
#     additional_paragraph = Paragraph(additional_text, styles["Normal"])
#     content.append(additional_paragraph)
    
#     doc.build(content)

# Usage
# create_pdf_with_advanced_formatting("advanced_formatting.pdf")
