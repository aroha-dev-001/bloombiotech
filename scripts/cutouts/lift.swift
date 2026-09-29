import Foundation
import Vision
import CoreImage
import CoreImage.CIFilterBuiltins
import ImageIO
import UniformTypeIdentifiers

// usage: lift <in> <out.png>
let args = CommandLine.arguments
let inURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])
guard let src = CGImageSourceCreateWithURL(inURL as CFURL, nil),
      let cg = CGImageSourceCreateImageAtIndex(src, 0, nil) else { fatalError("read") }
let req = VNGenerateForegroundInstanceMaskRequest()
let handler = VNImageRequestHandler(cgImage: cg, options: [:])
try handler.perform([req])
guard let obs = req.results?.first else { print("NO SUBJECT \(args[1])"); exit(2) }
let buf = try obs.generateMaskedImage(ofInstances: obs.allInstances, from: handler, croppedToInstancesExtent: false)
let ci = CIImage(cvPixelBuffer: buf)
let ctx = CIContext()
try ctx.writePNGRepresentation(of: ci, to: outURL, format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!)
print("ok \(args[1]) instances=\(obs.allInstances.count)")
