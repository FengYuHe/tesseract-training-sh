# tesseract-training-sh
[`tesseracr-ocr`](https://github.com/tesseract-ocr/tesseract) 训练字库自动生成脚本

## 前提
* 已生成`.tif`图片
* 已制作`.box`文件且已手动校验
* 已正确创建`font_properties`字体文件(正确性很重要)

## Usage(暂时没有打包)
* 修改 `option` 参数
* 放在 `.tif` 、`.box`和 `font_properties`文件相同目录下
* 执行完后会把生成的文件自动删除，留下 `.traineddata` 文件

```sh
node combination.js
```

PS：简单写的脚本，没有使用Promise，没有尝试过错误检验。检查生成的语言库`.traineddata`的大小和检验命令行的打印提示即可判定是否成功生成语言库。
