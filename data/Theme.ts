export default `<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      * {
        font-family: inherit;
        margin: 0;
        padding: 0;
        border: none;
      }
      /* .container {
        width: 30rem;
      } */
      .rec-recipe-slider-bx {
        background-color: #fff;
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
        max-height: 15rem;
        margin: 0 auto;
        overflow: hidden;
      }
      .blender-slider-bx {
        /* margin: 10px 15px 10px 0; */
        transition: all 0.2s;
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
      @media only screen and (max-width: 600px) {
        .rec-recipe-left strong {
          color: goldenrod;
        }
      }
    </style>
    <title>Blending 101</title>
  </head>
  <body>
    <div class="container">
      <div class="rec-recipe-slider-bx blender-slider-bx">
        <h2 style="word-wrap: wrap">
          <%= data.name ? data.name : 'Banana Mango Smoothie' %>
        </h2>
        <figure>
          <img src=<%= data.image && data.image[0] ? data.image[0].image :
          "images/smoothie-img.png" %> alt="img" />
        </figure>
        <div class="rec-recipe-content">
          <div class="rec-recipe-left">
            <span>Rx Score</span>
            <strong onclick=<%= methods.addToCollection %>>500</strong>
          </div>

          <div class="rating-right">
            <span class="ratings-bx">
              <img src="images/full-star.svg" alt="" /> 4.9 (71)
            </span>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`;
