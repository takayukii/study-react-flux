# 2015年GWのお勉強

フロントエンドがあまり得意ではないためハンズオンで知識と動くコードの経験値を補充する。今回は下記の技術に着目。

* Sass/Scss + Compass
* React + flux

## ゴール

深堀りは置いておいて、まず経験するというのを目標にする。動くコードが手元にあるのとないのとではぜんぜん違う。

## Sass/Scss + Compass

SassとScssはほぼ一緒で今はよりCSSライクなScssが用いられる事が多いらしい。LessとScssはよく比較されるらしいが、Scssのほうが多機能。ただ文化的にScssはRubyから、LessはNodeからといったところがあり、Lessはよりシンプルで開発時やサーバーサイドでのビルドタスク等でコンパイルしなくてもフロント側で処理できてしまうらしい。CSSプリプロセッサと言うが、これらの他にはStylus等も出てきている。

CompassはSass/Scss上に作られたフレームワークのような存在で、たとえばborder-radius等のベンダープリフィックスを書かなくてもCompassがよろしくやってくれたり、かなり便利な存在。CSS3等の書き方をCompassが抽象化しれているので細かいところに悩まなくても良い。あとはよく使うCSSの適用パターンを関数化してくれている。

http://compass-style.org/reference/compass/

Scss + Compassについてはこの記事を読めば十分メリットや使い方がよく分かる。

http://liginc.co.jp/designer/archives/11623

また、Sublime Text 3にScss + Compassのプラグインを入れてSublime上でコンパイルする事もできる。

http://qiita.com/1000doc/items/579b04b1404a0cd09a62

便利すぎてもうCSS直書きに戻る気にはなれなくなる。ただ、少し気になるのはScss上でコメントを入れるとなぜかコンパイルエラーになる…。なぜだろう。

## React + flux

