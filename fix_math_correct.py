import os

path = r'D:\FILES\Documents\pku\CHAI-bt.github.io\electrodynamics'
for fname in ['ch4-test.html', 'ch5-test.html', 'ch6-test.html']:
    fp = os.path.join(path, fname)
    with open(fp, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    for line in lines:
        if '$' not in line or ('<' not in line and '>' not in line):
            new_lines.append(line)
            continue

        result = []
        i = 0
        while i < len(line):
            if line[i] == '$':
                j = line.find('$', i + 1)
                if j == -1:
                    result.append(line[i:])
                    break
                seg = line[i:j+1]
                if '<' in seg or '>' in seg:
                    # Replace < with \\lt and > with \\gt
                    # In JSON source, \\lt becomes \lt in the rendered string
                    seg = seg.replace('<', '\\\\lt ').replace('>', '\\\\gt ')
                result.append(seg)
                i = j + 1
            else:
                result.append(line[i])
                i += 1
        new_lines.append(''.join(result))

    with open(fp, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print(f'Fixed: {fname}')
