# tesseract-training-sh
[`tesseracr-ocr`](https://github.com/tesseract-ocr/tesseract) 训练字库自动生成脚本

## 前提
* 已生成`.tif`图片
* 已制作`.box`文件且已手动校验
* 已正确创建`font_properties`字体文件(正确性很重要)

## Usage(暂时没有打包)
* 修改 `option` 参数
* 放在 `.tif` 、`.box`和 `font_properties`文件相同目录下

```sh
node combination.js
```
