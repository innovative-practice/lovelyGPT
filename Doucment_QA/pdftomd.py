import fitz
from tqdm import tqdm
import html2text as ht


def pdf2html(input_path, html_path):
    doc = fitz.open(input_path)
    for page in tqdm(doc):
        html_content = page.get_text('html')
    print("开始输出html文件")
    with open(html_path, 'w', encoding='utf8', newline="") as fp:
        fp.write(html_content)


input_path = r'E:\\Nodejs_project\\myGPT\\Doucment_QA\\hh.pdf'  # 如果报错 就用绝对路径
html_path = r'E:\\Nodejs_project\\myGPT\\Doucment_QA\\input.html'
pdf2html(input_path, html_path)
text_maker = ht.HTML2Text()
text_maker.bypass_tables = False
path = r"E:\\Nodejs_project\\myGPT\\Doucment_QA\\input.html"
htmlfile = open(path, 'r', encoding='UTF-8')
htmlpage = htmlfile.read()
text = text_maker.handle(htmlpage)
md = text.split('#')
print(md)
# open("test.md", "w").write(md[1])
