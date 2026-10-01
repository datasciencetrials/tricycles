file_path = r'D:\OneDrive\Project level\Ambrose\tricycles\website\src\components\ThesisTab.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I need to find the </div>\n\n          <div id="downloads" and remove that first </div>.
content = content.replace('</div>\n\n          <div id="downloads"', '\n          <div id="downloads"')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed adjacent JSX element issue.')
