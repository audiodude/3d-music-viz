export class CanvasCapture {
  private canvas: HTMLCanvasElement = null;
  private frameCount: number = 0;
  private hasError: boolean = false;

  captureFrame = function () {
    if (this.hasError) {
      return Promise.resolve(undefined);
    }

    this.canvas = this.canvas || document.getElementsByTagName('CANVAS')[0];
    var img = this.canvas.toDataURL('image/png');

    const formData = new FormData();
    formData.append('frame', (this.frameCount++).toString());
    formData.append('filename', 'test');
    formData.append('data', img);

    return fetch('http://localhost:5000/capture', {
      method: 'POST',
      body: formData,
    })
      .then((resp) => {
        if (!resp.ok) {
          throw Error(resp.statusText);
        }
        return resp;
      })
      .catch((error) => {
        // If the server is unavailable, stop the capture process.
        this.hasError = true;
      });
  };
}
