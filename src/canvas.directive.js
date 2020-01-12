
    import { v4 } from 'uuid';

    function inserted(el) {
      const canvas = el;
      const ctx = canvas.getContext('2d');

      canvas.width = 1800;
      canvas.height = 1500;

      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.lineWidth = 5;

      let prevPos = { offsetX: 0, offsetY: 0 };
      let line = [];
      let isPainting = false;
      const userId = v4();
      const USER_STROKE = 'black';
      //const GUEST_STROKE = 'greenyellow';
      //changing color and press to search

      function handleMouseDown(e) {
        const { offsetX, offsetY } = e;
        isPainting = true;
        prevPos = { offsetX, offsetY };
      }
      function endPaintEvent() {
        if (isPainting) {
          isPainting = false;
          sendPaintData();
        }
      }
      function handleMouseMove(e) {
        if (isPainting) {
          const { offsetX, offsetY } = e;
          const offSetData = { offsetX, offsetY };
          const positionInfo = {
            start: { ...prevPos },
            stop: { ...offSetData },
          };
          line = line.concat(positionInfo);
          paint(prevPos, offSetData, USER_STROKE);
        }
      }
      function sendPaintData() {
        const body = {
          line,
          userId,
        };
        fetch('http://localhost:4000/paint', {
          method: 'post',
          body: JSON.stringify(body),
          headers: {
            'content-type': 'application/json',
          },
        }).then(() => (line = []));
      }
      function paint(prevPosition, currPosition, strokeStyle) {
        const { offsetX, offsetY } = currPosition;
        const { offsetX: x, offsetY: y } = prevPosition;
        ctx.beginPath();
        ctx.strokeStyle = strokeStyle;
        ctx.moveTo(x, y);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
        prevPos = { offsetX, offsetY };
      }
      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseup', endPaintEvent);
      canvas.addEventListener('mouseleave', endPaintEvent);
    }
    export default {
      inserted,
    };