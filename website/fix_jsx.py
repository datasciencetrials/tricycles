import re
file_path = r'D:\OneDrive\Project level\Ambrose\tricycles\website\src\components\ThesisTab.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('style={ marginTop: \'40px\' }', 'style={{ marginTop: \'40px\' }}')
content = content.replace('style={ color: \'#fff\', marginTop: \'16px\' }', 'style={{ color: \'#fff\', marginTop: \'16px\' }}')
# also fix any h2 that had className
content = re.sub(r'style=\{ marginTop: \'40px\' \}', r'style={{ marginTop: \'40px\' }}', content)
content = re.sub(r'style=\{ color: \'#fff\', marginTop: \'16px\' \}', r'style={{ color: \'#fff\', marginTop: \'16px\' }}', content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed JSX style syntax errors.')
