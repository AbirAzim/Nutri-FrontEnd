const HTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      * {
        font-family: inherit;
      }
      .rec-recipe-slider-bx {
        background-color: #fff;
        /* width: 30rem; */
      }
      .rec-recipe-slider-bx h2 {
        font-size: 14px;
        color: #000;
        margin: 0;
        padding: 10px 10px 20px 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .rec-recipe-slider-bx figure {
        margin: 0;
        padding: 0;
        text-align: center;
      }
      .rec-recipe-slider-bx figure img {
        /* padding: 0 10px; */
        width: 95%;
        max-height: 15rem;
        object-fit: contain;
        overflow: hidden;
      }
      .blender-slider-bx {
        margin: 10px 15px 10px 0;
        -webkit-transition: all 0.2s;
        -moz-transition: all 0.2s;
        -ms-transition: all 0.2s;
        -o-transition: all 0.2s;
        border-radius: 6px;
      }
      .blender-slider-bx:hover {
        box-shadow: 0px 2px 3px #0000001a;
      }

      .rec-recipe-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
      }

      .rec-recipe-left span {
        font-size: 14px;
        font-weight: 500;
      }

      .rec-recipe-left strong {
        color: #fe5d1f;
        font-size: 15px;
        padding-left: 3px;
        font-weight: 600;
      }
      .ratings-bx {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 500;
        line-height: 1;
      }

      .ratings-bx img {
        margin-right: 4px;
      }
    </style>
    <title>Blending 101</title>
  </head>
  <body>
    <div class="rec-recipe-slider-bx blender-slider-bx">
      <h2 id="Name" className="ToggleCollection">Banana Mango Smoothie</h2>
      <figure>
        <img id="Image" src="images/smoothie-img.png" alt="img" />
      </figure>
      <div class="rec-recipe-content">
        <div class="rec-recipe-left">
          <span>Rx Score</span> <strong>500</strong>
        </div>

        <div class="rating-right">
          <span class="ratings-bx">
            <img src="images/full-star.svg" alt="" /> 4.9 (71)
          </span>
        </div>
      </div>
    </div>
  </body>
</html>

`;

export default HTML;
