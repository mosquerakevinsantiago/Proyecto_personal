const video = document.getElementById("video");

/* VOZ */
function speak(t){
  let s=new SpeechSynthesisUtterance(t);
    s.lang="es-ES";
      speechSynthesis.speak(s);
      }

      /* INICIAR */
      async function start(){
        document.getElementById("status").innerText="Cargando modelos...";

          await faceapi.nets.tinyFaceDetector.loadFromUri("/models");

            document.getElementById("status").innerText="Activando cámara...";

              let stream = await navigator.mediaDevices.getUserMedia({ video:{} });
                video.srcObject = stream;

                  video.addEventListener("play", detect);
                  }

                  start();

                  /* DETECCIÓN */
                  function detect(){
                    const canvas = faceapi.createCanvasFromMedia(video);
                      document.body.append(canvas);

                        const displaySize = { width:320, height:240 };
                          faceapi.matchDimensions(canvas, displaySize);

                            setInterval(async () => {
                                const detections = await faceapi.detectAllFaces(
                                      video,
                                            new faceapi.TinyFaceDetectorOptions()
                                                );

                                                    canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);

                                                        const resized = faceapi.resizeResults(detections, displaySize);
                                                            faceapi.draw.drawDetections(canvas, resized);

                                                                if(resized.length > 0){
                                                                      document.getElementById("status").innerText="Rostro detectado";

                                                                            setTimeout(()=>{
                                                                                    speak("Identidad confirmada");

                                                                                            document.getElementById("scan").style.display="none";
                                                                                                    document.getElementById("login").style.display="flex";

                                                                                                          },1500);
                                                                                                              }

                                                                                                                }, 300);
                                                                                                                }

                                                                                                                /* ENTRAR */
                                                                                                                function enter(){
                                                                                                                  document.getElementById("login").style.display="none";
                                                                                                                    document.getElementById("cv").style.display="block";
                                                                                                                    }