import CMS from "netlify-cms-app"
import cloudinary from "netlify-cms-media-library-cloudinary"
import {
  Control as dynamicSelectControl,
  Preview as dynamicSelectPreview,
} from "./dynamicSelectWidget"
import ProductPagePreview from "./preview-templates/ProductPagePreview"

CMS.registerMediaLibrary(cloudinary)
CMS.registerPreviewTemplate("products", ProductPagePreview)

CMS.registerWidget("dynamicSelect", dynamicSelectControl, dynamicSelectPreview)
