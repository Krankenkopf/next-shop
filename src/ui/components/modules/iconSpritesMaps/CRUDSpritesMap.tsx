import React from 'react';

// Data manipulations icons
export const CRUDSpritesMap = () => (
  <svg id="crud-icons" xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
    <defs />
    {/* <symbol id="database" viewBox="0 0 448 512">
            <path d="M448 73.125V118.875C448 159.125 347.625 192 224 192S0 159.125 0 118.875V73.125C0 32.875 100.375 0 224 0S448 32.875 448 73.125Z" className="fa-secondary" fill="var(--secondary)" fillOpacity="var(--secondary-opacity)"></path><path d="M224 224.625C136.25 224.625 48.125 209.125 0 176V278.875C0 319.125 100.375 352 224 352S448 319.125 448 278.875V176C399.875 209.125 311.75 224.625 224 224.625ZM0 336V438.875C0 479.125 100.375 512 224 512S448 479.125 448 438.875V336C399.875 369.125 311.75 384.625 224 384.625S48.125 369.125 0 336Z" className="fa-primary" fill="var(--primary)" fillOpacity="var(--primary-opacity)"></path>
        </symbol> */}
    {/* <symbol id="download" viewBox="0 0 512 512">
            <path d="M480 352H346.5L301.25 397.25C289.156 409.344 273.094 416 256 416S222.844 409.344 210.75 397.25L165.5 352H32C14.326 352 0 366.326 0 384V480C0 497.672 14.326 512 32 512H480C497.674 512 512 497.672 512 480V384C512 366.326 497.674 352 480 352ZM432 456C418.801 456 408 445.199 408 432C408 418.799 418.801 408 432 408S456 418.799 456 432C456 445.199 445.199 456 432 456Z" className="fa-secondary" fill="var(--secondary)" fillOpacity="var(--secondary-opacity)"></path><path d="M105.371 246.621C92.876 234.125 92.876 213.867 105.371 201.371C117.867 188.875 138.126 188.875 150.621 201.371L224 274.75V32C224 14.326 238.328 0 256 0C273.673 0 288 14.326 288 32V274.75L361.378 201.371C373.873 188.875 394.132 188.875 406.628 201.371C419.123 213.867 419.123 234.125 406.628 246.621L278.625 374.625C272.375 380.875 264.187 384 256 384S239.625 380.875 233.375 374.625L105.371 246.621Z" className="fa-primary" fill="var(--primary)" fillOpacity="var(--primary-opacity)"></path>
        </symbol> */}
    {/* <symbol id="floppy-disk" viewBox="0 0 448 512">
            <path d="M433.938 129.938L350.062 46.062C342.328 38.328 327.051 32 316.113 32H64C28.654 32 0 60.652 0 96V416C0 451.346 28.654 480 64 480H384C419.346 480 448 451.346 448 416V163.887C448 152.949 441.672 137.672 433.938 129.938ZM224 416C188.656 416 160 387.344 160 352S188.656 288 224 288S288 316.656 288 352S259.344 416 224 416ZM320 208C320 216.836 312.836 224 304 224H80C71.164 224 64 216.836 64 208V112C64 103.162 71.164 96 80 96H304C312.836 96 320 103.162 320 112V208Z" className="fa-secondary" fill="var(--secondary)" fillOpacity="var(--secondary-opacity)"></path><path d="M288 352C288 387.344 259.344 416 224 416S160 387.344 160 352S188.656 288 224 288S288 316.656 288 352Z" className="fa-primary" fill="var(--primary)" fillOpacity="var(--primary-opacity)"></path>
        </symbol> */}
    {/* <symbol id="server" viewBox="0 0 512 512">
            <path d="M480 288H32C14.375 288 0 302.375 0 320V448C0 465.625 14.375 480 32 480H480C497.625 480 512 465.625 512 448V320C512 302.375 497.625 288 480 288ZM352 408C338.75 408 328 397.25 328 384S338.75 360 352 360S376 370.75 376 384S365.25 408 352 408ZM416 408C402.75 408 392 397.25 392 384S402.75 360 416 360S440 370.75 440 384S429.25 408 416 408ZM416 152C429.25 152 440 141.25 440 128S429.25 104 416 104S392 114.75 392 128S402.75 152 416 152Z" className="fa-secondary" fill="var(--secondary)" fillOpacity="var(--secondary-opacity)"></path><path d="M480 32H32C14.375 32 0 46.375 0 64V192C0 209.625 14.375 224 32 224H480C497.625 224 512 209.625 512 192V64C512 46.375 497.625 32 480 32ZM352 152C338.75 152 328 141.25 328 128S338.75 104 352 104S376 114.75 376 128S365.25 152 352 152ZM416 152C402.75 152 392 141.25 392 128S402.75 104 416 104S440 114.75 440 128S429.25 152 416 152ZM416 360C402.746 360 392 370.746 392 384S402.746 408 416 408C429.256 408 440 397.254 440 384S429.256 360 416 360Z" className="fa-primary" fill="var(--primary)" fillOpacity="var(--primary-opacity)"></path>
        </symbol> */}
    <symbol id="trash-can" viewBox="0 0 448 512">
      <path
        d="M32 96V464C32 490.5 53.5 512 80 512H368C394.5 512 416 490.5 416 464V96H32ZM144 416C144 424.875 136.875 432 128 432S112 424.875 112 416V192C112 183.125 119.125 176 128 176S144 183.125 144 192V416ZM240 416C240 424.875 232.875 432 224 432S208 424.875 208 416V192C208 183.125 215.125 176 224 176S240 183.125 240 192V416ZM336 416C336 424.875 328.875 432 320 432S304 424.875 304 416V192C304 183.125 311.125 176 320 176S336 183.125 336 192V416Z"
        className="fa-secondary"
        fill="var(--secondary)"
        fillOpacity="var(--secondary-opacity)"
      />
      <path
        d="M432 32.001H320L308.422 8.844C305.713 3.424 300.172 0.001 294.111 0.001H153.889C147.828 0.001 142.289 3.424 139.578 8.844L128 32.001H16C7.164 32.001 0 39.163 0 48.001V80.001C0 88.837 7.164 96.001 16 96.001H432C440.838 96.001 448 88.837 448 80.001V48.001C448 39.163 440.838 32.001 432 32.001Z"
        className="fa-primary"
        fill="var(--primary)"
        fillOpacity="var(--primary-opacity)"
      />
    </symbol>
    <symbol id="trash-can-arrow-up" viewBox="0 0 448 512">
      <path
        d="M32 96V464C32 490.5 53.5 512 80 512H368C394.5 512 416 490.5 416 464V96H32ZM328.969 288.969C319.594 298.344 304.406 298.344 295.031 288.969L248 241.938V392C248 405.25 237.25 416 224 416S200 405.25 200 392V241.938L152.969 288.969C143.594 298.344 128.406 298.344 119.031 288.969S109.656 264.406 119.031 255.031L207.031 167.031C209.596 164.467 215.506 160 224 160S238.404 164.467 240.969 167.031L328.969 255.031C338.344 264.406 338.344 279.594 328.969 288.969Z"
        className="fa-secondary"
        fill="var(--secondary)"
        fillOpacity="var(--secondary-opacity)"
      />
      <path
        d="M240.969 167.031C238.404 164.467 232.494 160 224 160S209.596 164.467 207.031 167.031L119.031 255.031C109.656 264.406 109.656 279.594 119.031 288.969S143.594 298.344 152.969 288.969L200 241.938V392C200 405.25 210.75 416 224 416S248 405.25 248 392V241.938L295.031 288.969C304.406 298.344 319.594 298.344 328.969 288.969S338.344 264.406 328.969 255.031L240.969 167.031ZM432 32H312L302.625 13.25C298.5 5.125 290.25 0 281.125 0H166.75C157.75 0 149.375 5.125 145.375 13.25L136 32H16C7.125 32 0 39.125 0 48V80C0 88.875 7.125 96 16 96H432C440.875 96 448 88.875 448 80V48C448 39.125 440.875 32 432 32Z"
        className="fa-primary"
        fill="var(--primary)"
        fillOpacity="var(--primary-opacity)"
      />
    </symbol>
    <symbol id="trash-can-clock" viewBox="0 0 576 512">
      <path
        d="M32 96V464C32 490.5 53.5 512 80 512H331.002C285.691 480.158 256 427.586 256 368C256 321.297 274.316 278.959 304 247.453V192C304 183.125 311.125 176 320 176S336 183.125 336 192V220.6C359.412 205.32 386.646 195.455 416 192.807V96H32ZM144 416C144 424.875 136.875 432 128 432S112 424.875 112 416V192C112 183.125 119.125 176 128 176S144 183.125 144 192V416ZM240 416C240 424.875 232.875 432 224 432S208 424.875 208 416V192C208 183.125 215.125 176 224 176S240 183.125 240 192V416Z"
        className="fa-secondary"
        fill="var(--secondary)"
        fillOpacity="var(--secondary-opacity)"
      />
      <path
        d="M448 80V48C448 39.162 440.838 32 432 32H320L308.422 8.844C305.713 3.424 300.172 0 294.111 0H153.889C147.828 0 142.289 3.424 139.578 8.844L128 32H16C7.164 32 0 39.162 0 48V80C0 88.836 7.164 96 16 96H432C440.838 96 448 88.836 448 80ZM432 224C352.375 224 288 288.375 288 368S352.375 512 432 512S576 447.625 576 368S511.625 224 432 224ZM480 384H425.75C420.375 384 416 379.625 416 374.25V304C416 295.162 423.164 288 432 288C440.838 288 448 295.162 448 304V352H480C488.838 352 496 359.162 496 368C496 376.836 488.838 384 480 384Z"
        className="fa-primary"
        fill="var(--primary)"
        fillOpacity="var(--primary-opacity)"
      />
    </symbol>
    <symbol id="trash-can-list" viewBox="0 0 640 512">
      <path
        d="M32 95.998V463.998C32 490.498 53.5 511.998 80 511.998H336C362.5 511.998 384 490.498 384 463.998V95.998H32ZM160 415.998C160 424.873 152.875 431.998 144 431.998S128 424.873 128 415.998V191.998C128 183.123 135.125 175.998 144 175.998S160 183.123 160 191.998V415.998ZM288 415.998C288 424.873 280.875 431.998 272 431.998S256 424.873 256 415.998V191.998C256 183.123 263.125 175.998 272 175.998S288 183.123 288 191.998V415.998Z"
        className="fa-secondary"
        fill="var(--secondary)"
        fillOpacity="var(--secondary-opacity)"
      />
      <path
        d="M400 32H320L308.422 8.844C305.713 3.424 300.172 0 294.111 0H121.889C115.828 0 110.289 3.424 107.578 8.844L96 32H16C7.164 32 0 39.162 0 48V80C0 88.836 7.164 96 16 96H400C408.838 96 416 88.836 416 80V48C416 39.162 408.838 32 400 32ZM512 384H480C462.327 384 448 398.327 448 416V416C448 433.673 462.327 448 480 448H512C529.673 448 544 433.673 544 416V416C544 398.327 529.673 384 512 384ZM608 128H480C462.327 128 448 142.327 448 160V160C448 177.673 462.327 192 480 192H608C625.673 192 640 177.673 640 160V160C640 142.327 625.673 128 608 128ZM576 256H480C462.327 256 448 270.327 448 288V288C448 305.673 462.327 320 480 320H576C593.673 320 608 305.673 608 288V288C608 270.327 593.673 256 576 256Z"
        className="fa-primary"
        fill="var(--primary)"
        fillOpacity="var(--primary-opacity)"
      />
    </symbol>
    <symbol id="trash-can-slash" viewBox="0 0 640 512">
      <path
        d="M416 448C407.125 448 400 440.875 400 432V410.195L336 360.033V432C336 440.875 328.875 448 320 448S304 440.875 304 432V334.953L240 284.791V432C240 440.875 232.875 448 224 448S208 440.875 208 432V259.711L128 197.008V464C128 490.5 149.5 512 176 512H464C480.359 512 494.773 503.773 503.439 491.27L431.432 434.83C430.062 442.287 423.869 448 416 448ZM304 212.955V208C304 199.125 311.125 192 320 192S336 199.125 336 208V238.037L400 288.197V208C400 199.125 407.125 192 416 192S432 199.125 432 208V313.279L512 375.98V128H195.607L304 212.955ZM528 32H416L404.422 8.844C401.713 3.424 396.172 0 390.111 0H249.889C243.828 0 238.289 3.424 235.578 8.844L224 32H112C103.164 32 96 39.162 96 48V49.93L154.779 96H528C536.838 96 544 88.836 544 80V48C544 39.162 536.838 32 528 32Z"
        className="fa-secondary"
        fill="var(--secondary)"
        fillOpacity="var(--secondary-opacity)"
      />
      <path
        d="M24.032 0C29.189 0 34.407 1.672 38.814 5.109L630.811 469.102C641.249 477.274 643.061 492.367 634.874 502.805C626.749 513.211 611.686 515.086 601.186 506.883L9.189 42.89C-1.249 34.718 -3.061 19.625 5.126 9.187C9.845 3.156 16.907 0 24.032 0Z"
        className="fa-primary"
        fill="var(--primary)"
        fillOpacity="var(--primary-opacity)"
      />
    </symbol>
    <symbol id="trash-can-undo" viewBox="0 0 448 512">
      <path
        d="M32 96V464C32 490.5 53.5 512 80 512H368C394.5 512 416 490.5 416 464V96H32ZM328 392C328 405.25 317.25 416 304 416S280 405.25 280 392V352C280 329.938 262.062 312 240 312H177.938L208.969 343.031C218.344 352.406 218.344 367.594 208.969 376.969C204.281 381.656 198.141 384 192 384S179.719 381.656 175.031 376.969L103.031 304.969C93.656 295.594 93.656 280.406 103.031 271.031L175.031 199.031C184.406 189.656 199.594 189.656 208.969 199.031S218.344 223.594 208.969 232.969L177.938 264H240C288.531 264 328 303.469 328 352V392Z"
        className="fa-secondary"
        fill="var(--secondary)"
        fillOpacity="var(--secondary-opacity)"
      />
      <path
        d="M240 264H177.938L208.969 232.969C218.344 223.594 218.344 208.406 208.969 199.031S184.406 189.656 175.031 199.031L103.031 271.031C93.656 280.406 93.656 295.594 103.031 304.969L175.031 376.969C179.719 381.656 185.859 384 192 384S204.281 381.656 208.969 376.969C218.344 367.594 218.344 352.406 208.969 343.031L177.938 312H240C262.062 312 280 329.938 280 352V392C280 405.25 290.75 416 304 416S328 405.25 328 392V352C328 303.469 288.531 264 240 264ZM432 32H312L302.625 13.25C298.5 5.125 290.25 0 281.125 0H166.75C157.75 0 149.375 5.125 145.375 13.25L136 32H16C7.125 32 0 39.125 0 48V80C0 88.875 7.125 96 16 96H432C440.875 96 448 88.875 448 80V48C448 39.125 440.875 32 432 32Z"
        className="fa-primary"
        fill="var(--primary)"
        fillOpacity="var(--primary-opacity)"
      />
    </symbol>
  </svg>
);