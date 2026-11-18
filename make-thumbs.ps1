# Rebuilds the small preview copies used by the photo reels (photos/thumbs/).
# Run this after adding, replacing or renaming photos: double-click make-thumbs.bat
Add-Type -AssemblyName System.Drawing
$photos = Join-Path $PSScriptRoot 'photos'
$thumbs = Join-Path $photos 'thumbs'
New-Item -ItemType Directory -Force $thumbs | Out-Null
$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 78L

# remove previews whose photo no longer exists (e.g. after a rename)
Get-ChildItem $thumbs -Filter *.jpg | Where-Object { -not (Test-Path (Join-Path $photos $_.Name)) } | ForEach-Object {
  Remove-Item $_.FullName; "removed old preview $($_.Name)"
}
# (re)make a preview for every photo
$n = 0
Get-ChildItem $photos -File | Where-Object { $_.Extension -match '^\.(jpe?g|png)$' } | ForEach-Object {
  $img = [System.Drawing.Image]::FromFile($_.FullName)
  $h = 480; $w = [int]($img.Width * $h / $img.Height)
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp); $g.InterpolationMode = 'HighQualityBicubic'
  $g.DrawImage($img, 0, 0, $w, $h)
  $bmp.Save((Join-Path $thumbs ([IO.Path]::ChangeExtension($_.Name, '.jpg'))), $enc, $ep)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose(); $n++
}
"done - $n previews up to date"
