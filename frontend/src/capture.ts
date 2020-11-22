export class CanvasCapture {
  private canvas: HTMLCanvasElement = null;
  private frameCount: number = 0;
  private hasError: boolean = false;

  captureFrame = function () {
    if (this.hasError) {
      return;
    }

    this.canvas = this.canvas || document.getElementsByTagName("CANVAS")[0];
    var img = this.canvas.toDataURL("image/png");

    const formData = new FormData();
    formData.append("frame", (this.frameCount++).toString());
    formData.append("data", img);

    fetch("http://localhost:5000/capture", {
      method: "POST",
      body: formData,
    }).catch(() => {
      // If the server is unavailable, stop the capture process.
      this.hasError = true;
    });
  };
}
