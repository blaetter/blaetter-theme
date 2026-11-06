<?php
/*
 * Checks that the built palm.css uses only the colours of blaetter-design.
 *
 * Allowed: the colours of source-bundle/scss/00-global/00-blaetter-tokens.scss
 * (a copy of dist/tokens.scss of blaetter-design), black and white, and the
 * few exceptions below; each also with opacity (rgba/hsla: shadows, overlays,
 * fades). Every other colour
 * in a colour property is reported with its selector; the exit code is 1 then.
 *
 * Usage (in the container, after the build): php bin/colors-check.php [path/to/palm.css]
 * Runs with PHP 7.3 (the image of this repository).
 */

$root = dirname(__DIR__);
$css = $argv[1] ?? $root . '/public/themes/contrib/palm/bundle/palm.css';
$tokens = $root . '/source-bundle/scss/00-global/00-blaetter-tokens.scss';

// Colours that are not tokens on purpose. Keep this list short and give a reason.
$exceptions = [
    '#3b5998' => 'Facebook (share button)',
    '#1a8cd8' => 'Twitter (share button), darkened for 3:1 with the white icon',
    '#2c2c2c' => 'Instagram (share button)',
];

// Colour keywords Sass writes instead of a hex value when that is shorter.
$named = [
    'black' => '#000000', 'white' => '#ffffff', 'grey' => '#808080', 'gray' => '#808080',
    'silver' => '#c0c0c0', 'red' => '#ff0000', 'maroon' => '#800000', 'green' => '#008000',
    'olive' => '#808000', 'navy' => '#000080', 'purple' => '#800080', 'teal' => '#008080',
    'orange' => '#ffa500', 'tan' => '#d2b48c', 'gold' => '#ffd700', 'pink' => '#ffc0cb',
    'plum' => '#dda0dd', 'snow' => '#fffafa', 'linen' => '#faf0e6', 'wheat' => '#f5deb3',
    'khaki' => '#f0e68c', 'coral' => '#ff7f50', 'salmon' => '#fa8072', 'tomato' => '#ff6347',
    'orchid' => '#da70d6', 'sienna' => '#a0522d', 'peru' => '#cd853f', 'beige' => '#f5f5dc',
    'azure' => '#f0ffff', 'ivory' => '#fffff0', 'bisque' => '#ffe4c4', 'indigo' => '#4b0082',
    'violet' => '#ee82ee', 'crimson' => '#dc143c', 'brown' => '#a52a2a', 'lime' => '#00ff00',
    'aqua' => '#00ffff', 'cyan' => '#00ffff', 'fuchsia' => '#ff00ff', 'magenta' => '#ff00ff',
    'yellow' => '#ffff00', 'blue' => '#0000ff', 'lightgrey' => '#d3d3d3', 'darkgrey' => '#a9a9a9',
    'dimgrey' => '#696969', 'gainsboro' => '#dcdcdc', 'whitesmoke' => '#f5f5f5',
];

if (!is_file($css) || !is_file($tokens)) {
    fwrite(STDERR, "Missing $css or $tokens (build first: make all)\n");
    exit(2);
}

preg_match_all('/^\$blaetter-(?:color|cover)-[a-z-]+:\s*(#[0-9a-f]{6});/m', file_get_contents($tokens), $m);
$allowed = array_fill_keys($m[1], 'token');
if ($allowed === []) {
    fwrite(STDERR, "No colours found in $tokens\n");
    exit(2);
}
$allowed += $exceptions;
$allowed['#000000'] = 'black';
$allowed['#ffffff'] = 'white';

/** rgb(a)/hsl(a) as #rrggbb (opacity dropped), or null when it can not be read */
function functional($value)
{
    if (!preg_match('/^(rgb|hsl)a?\(([^)]*)\)$/', $value, $f)) {
        return null;
    }
    $parts = preg_split('/[\s,\/]+/', trim($f[2]));
    if (count($parts) < 3) {
        return null;
    }
    if ($f[1] === 'rgb') {
        $rgb = array_map(function ($p) {
            return substr($p, -1) === '%' ? (float) $p * 2.55 : (float) $p;
        }, array_slice($parts, 0, 3));
    } else {
        $h = fmod((float) $parts[0], 360) / 360;
        $s = (float) $parts[1] / 100;
        $l = (float) $parts[2] / 100;
        $q = $l < 0.5 ? $l * (1 + $s) : $l + $s - $l * $s;
        $p = 2 * $l - $q;
        $rgb = [];
        foreach ([$h + 1 / 3, $h, $h - 1 / 3] as $t) {
            $t = $t < 0 ? $t + 1 : ($t > 1 ? $t - 1 : $t);
            $c = $t < 1 / 6 ? $p + ($q - $p) * 6 * $t : ($t < 1 / 2 ? $q : ($t < 2 / 3 ? $p + ($q - $p) * (2 / 3 - $t) * 6 : $p));
            $rgb[] = $c * 255;
        }
    }

    return vsprintf('#%02x%02x%02x', array_map(function ($c) {
        return max(0, min(255, (int) round($c)));
    }, $rgb));
}

function normalise($value)
{
    $value = strtolower($value);
    if (preg_match('/^#([0-9a-f])([0-9a-f])([0-9a-f])$/', $value, $h)) {
        return '#' . $h[1] . $h[1] . $h[2] . $h[2] . $h[3] . $h[3];
    }

    return $value;
}

$text = preg_replace('~/\*.*?\*/~s', '', file_get_contents($css));
$problems = [];
// Plain rules (innermost blocks): selector { declarations }
preg_match_all('/([^{}]+)\{([^{}]*)\}/', $text, $rules, PREG_SET_ORDER);
foreach ($rules as $rule) {
    $selector = trim(preg_replace('/\s+/', ' ', $rule[1]));
    foreach (explode(';', $rule[2]) as $declaration) {
        if (strpos($declaration, ':') === false) {
            continue;
        }
        list($property, $value) = array_map('trim', explode(':', $declaration, 2));
        $property = strtolower($property);
        if (!preg_match('/^(color|background(-color|-image)?|border(-[a-z]+)*|outline(-color)?|box-shadow|text-shadow|fill|stroke|caret-color|column-rule(-color)?|text-decoration(-color)?|--[a-z-]+)$/', $property)) {
            continue;
        }
        $value = preg_replace('/url\([^)]*\)/i', '', $value);
        preg_match_all('/#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)|\b[a-z]+\b/i', $value, $found);
        foreach ($found[0] as $colour) {
            $lower = strtolower($colour);
            if (strpos($lower, 'rgb') === 0 || strpos($lower, 'hsl') === 0) {
                // A token, black or white with opacity (Sass may round by one step).
                $hex = functional($lower);
                $ok = false;
                if ($hex !== null) {
                    foreach (array_keys($allowed) as $a) {
                        $near = true;
                        for ($i = 1; $i < 7; $i += 2) {
                            $near = $near && abs(hexdec(substr($a, $i, 2)) - hexdec(substr($hex, $i, 2))) <= 1;
                        }
                        if ($near) {
                            $ok = true;
                            break;
                        }
                    }
                }
                if (!$ok) {
                    $problems[] = [$colour, $property, $selector];
                }
                continue;
            }
            if ($lower[0] !== '#') {
                if (!isset($named[$lower])) {
                    continue; // not a colour (solid, none, inherit, transparent, …)
                }
                $lower = $named[$lower];
            }
            $lower = normalise($lower);
            if (!isset($allowed[$lower])) {
                $problems[] = [$colour, $property, $selector];
            }
        }
    }
}

if ($problems === []) {
    echo "palm.css: all colours are tokens of blaetter-design or listed exceptions\n";
    exit(0);
}
foreach ($problems as $p) {
    printf("%-10s %-18s %s\n", $p[0], $p[1], strlen($p[2]) > 90 ? substr($p[2], 0, 87) . '...' : $p[2]);
}
fprintf(STDERR, "palm.css: %d colour(s) are no tokens of blaetter-design (see above)\n", count($problems));
exit(1);
