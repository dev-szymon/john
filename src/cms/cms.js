import CMS from "netlify-cms-app"
import cloudinary from "netlify-cms-media-library-cloudinary"

import ProductPagePreview from "./preview-templates/ProductPagePreview"

CMS.registerMediaLibrary(cloudinary)
CMS.registerPreviewTemplate("products", ProductPagePreview)
