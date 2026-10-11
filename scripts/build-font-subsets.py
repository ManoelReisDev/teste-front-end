from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.pens.recordingPen import DecomposingRecordingPen
from fontTools.varLib.instancer import instantiateVariableFont

directory = Path(__file__).resolve().parents[1] / 'src/assets/fonts'
ranges = [(0x0, 0x24F), (0x300, 0x36F), (0x2000, 0x206F), (0x20A0, 0x20CF), (0x2212, 0x2212)]
unicodes = {code for start, end in ranges for code in range(start, end + 1)}
for path in sorted(directory.glob('*.woff2')):
    if path.stem.endswith('-latin'):
        continue
    original = TTFont(path, recalcTimestamp=False)
    font = TTFont(path, recalcTimestamp=False)
    if path.stem == 'work-sans-400':
        font = instantiateVariableFont(font, {'wght': 400})
    options = subset.Options()
    options.layout_features = ['*']
    options.glyph_names = True
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=unicodes)
    subsetter.subset(font)
    font.flavor = 'woff2'
    output = path.with_name(f'{path.stem}-latin.woff2')
    font.save(output)
    result = TTFont(output)
    original_map = original.getBestCmap()
    result_map = result.getBestCmap()
    expected = {code for code in original_map if code in unicodes}
    assert set(result_map) == expected, path.name
    for table, attrs in [('head', ['unitsPerEm']), ('hhea', ['ascent', 'descent', 'lineGap']), ('OS/2', ['sTypoAscender', 'sTypoDescender', 'sTypoLineGap', 'usWinAscent', 'usWinDescent'])]:
        for attr in attrs:
            assert getattr(original[table], attr) == getattr(result[table], attr), (path.name, table, attr)
    original_glyphs = original.getGlyphSet()
    result_glyphs = result.getGlyphSet()
    for code, name in result_map.items():
        source_name = original_map[code]
        assert original['hmtx'][source_name] == result['hmtx'][name], (path.name, code)
        source_pen = DecomposingRecordingPen(original_glyphs)
        result_pen = DecomposingRecordingPen(result_glyphs)
        original_glyphs[source_name].draw(source_pen)
        result_glyphs[name].draw(result_pen)
        assert source_pen.value == result_pen.value, (path.name, code, 'outline')
    print(f'{path.name}: {output.stat().st_size} bytes; {len(result_map)} characters, metrics and outlines verified')
