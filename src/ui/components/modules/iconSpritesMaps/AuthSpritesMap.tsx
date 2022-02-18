import React from 'react';

// Authentication icons
export const AuthSpritesMap = () => (
  <svg id="auth-icons" xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
    <defs />
    {/* <symbol id="at" viewBox="0 0 512 512">
            <path d="M495.999 256.274V277.112C495.999 323.847 466.727 367.455 421.774 380.238C408.821 383.922 396.132 384.973 383.999 384.033V318.726C386.671 319.291 389.163 320.347 391.999 320.347C414.062 320.347 431.999 302.389 431.999 280.301L431.999 264.138C431.999 172.171 364.975 89.788 273.437 80.92C168.609 70.764 79.999 153.356 79.999 256.274C79.999 344.157 144.612 417.22 228.761 430.367C244.382 432.808 255.999 445.992 255.999 461.802V461.802C255.999 481.318 238.581 496.717 219.293 493.742C89.137 473.663 -6.847 348.524 20.757 207.841C39.093 114.392 114.33 39.047 207.782 20.731C361.162 -9.332 495.999 107.993 495.999 256.274Z" className="fa-secondary" fill="var(--secondary)" fillOpacity="var(--secondary-opacity)"></path><path d="M384 318.726C365.896 314.901 352 299.55 352 280.301V160.164C352 151.318 344.836 144.146 336 144.146H304C296.701 144.146 290.797 149.138 288.875 155.827C274.051 148.577 257.609 144.146 240 144.146C178.145 144.146 128 194.348 128 256.274S178.145 368.402 240 368.402C266.436 368.402 290.408 358.85 309.566 343.514C327.062 366.329 353.729 381.686 384 384.033V318.726ZM240 304.329C213.533 304.329 192 282.771 192 256.274S213.533 208.219 240 208.219S288 229.777 288 256.274S266.467 304.329 240 304.329Z" className="fa-primary" fill="var(--primary)" fillOpacity="var(--primary-opacity)"></path>
        </symbol> */}
    <symbol id="check" viewBox="-100 0 612 512">
      <path
        d="M464.563 144.563L208.563 400.563C200.75 408.375 190.516 412.281 180.281 412.281S159.813 408.375 152 400.563L24 272.563C8.375 256.938 8.375 231.625 24 216S64.938 200.375 80.562 216L180.281 315.719L408 88C423.625 72.375 448.938 72.375 464.562 88S480.188 128.938 464.563 144.563Z"
        className="fa-secondary"
        fill="var(--secondary)"
        fillOpacity="var(--secondary-opacity)"
      />
      <path
        d=""
        className="fa-primary"
        fill="var(--primary)"
        fillOpacity="var(--primary-opacity)"
      />
    </symbol>
    {/* <symbol id="check-double" viewBox="0 0 512 512">
            <path d="M192 252.281C181.766 252.281 171.531 248.375 163.719 240.563L83.719 160.563C68.094 144.938 68.094 119.625 83.719 104S124.656 88.375 140.281 104L192 155.719L323.719 24C339.344 8.375 364.656 8.375 380.281 24S395.906 64.938 380.281 80.563L220.281 240.563C212.469 248.375 202.234 252.281 192 252.281Z" className="fa-secondary" fill="var(--secondary)" fillOpacity="var(--secondary-opacity)"></path><path d="M192 488C181.766 488 171.531 484.094 163.719 476.281L35.719 348.281C20.094 332.656 20.094 307.344 35.719 291.719S76.656 276.094 92.281 291.719L192 391.438L419.719 163.719C435.344 148.094 460.656 148.094 476.281 163.719S491.906 204.656 476.281 220.281L220.281 476.281C212.469 484.094 202.234 488 192 488Z" className="fa-primary" fill="var(--primary)" fillOpacity="var(--primary-opacity)"></path>
        </symbol> */}
    <symbol id="envelope" viewBox="0 0 512 512">
      <path
        d="M256 352.078C239.469 352.078 222.938 346.594 208.844 335.609L0 173.15V400C0 426.51 21.49 448 48 448H464C490.51 448 512 426.51 512 400V173.15L303.156 335.609C289.062 346.594 272.531 352.078 256 352.078ZM16.287 145.305L228.469 310.359C244.662 322.955 267.338 322.955 283.531 310.359L495.713 145.305C505.99 137.311 512 125.02 512 112C512 85.49 490.51 64 464 64H48C21.49 64 0 85.49 0 112C0 125.02 6.01 137.311 16.287 145.305Z"
        className="fa-secondary"
        fill="var(--secondary)"
        fillOpacity="var(--secondary-opacity)"
      />
    </symbol>
    <symbol id="envelope-duo" viewBox="0 0 512 512">
      <path
        d="M511.08 120H512V400C512 426.51 490.51 448 464 448H48C21.49 448 0 426.51 0 400V120H0.92C2.846 129.936 8.156 138.98 16.287 145.305L228.469 310.359C244.662 322.955 267.338 322.955 283.531 310.359L495.713 145.305C503.844 138.98 509.154 129.936 511.08 120Z"
        className="fa-secondary"
        fill="var(--secondary)"
        fillOpacity="var(--secondary-opacity)"
      />
      <path
        d="M16.287 145.305L228.469 310.359C244.662 322.955 267.338 322.955 283.531 310.359L495.713 145.305C505.99 137.311 512 125.02 512 112C512 85.49 490.51 64 464 64H48C21.49 64 0 85.49 0 112C0 125.02 6.01 137.311 16.287 145.305Z"
        className="fa-primary"
        fill="var(--primary)"
        fillOpacity="var(--primary-opacity)"
      />
    </symbol>
    <symbol id="envelope-dot" viewBox="0 0 576 512">
      <path
        d="M48.287 145.305L260.469 310.359C276.662 322.955 299.338 322.955 315.531 310.359L509.186 159.717C457.498 158.191 416 116.057 416 64H80C53.49 64 32 85.49 32 112C32 125.02 38.01 137.311 48.287 145.305ZM335.178 335.812C321.756 346.25 305.002 352 288 352S254.244 346.25 240.82 335.811L32 173.369V400C32 426.51 53.49 448 80 448H496C522.51 448 544 426.51 544 400V173.371L335.178 335.812Z"
        className="fa-secondary"
        fill="var(--secondary)"
        fillOpacity="var(--secondary-opacity)"
      />
      <path
        d="M512 0C547.346 0 576 28.654 576 64S547.346 128 512 128S448 99.346 448 64S476.654 0 512 0Z"
        className="fa-primary"
        fill="var(--primary)"
        fillOpacity="var(--primary-opacity)"
      />
    </symbol>
    <symbol id="envelope-open-text" viewBox="0 0 512 512">
      <path
        d="M416 32.004H96C78.328 32.004 64 46.33 64 64.003V246.422L228.469 374.36C244.664 386.956 267.336 386.956 283.531 374.36L448 246.422V64.003C448 46.33 433.672 32.004 416 32.004ZM336 223.998H176C167.164 223.998 160 216.834 160 207.998C160 199.161 167.164 191.999 176 191.999H336C344.836 191.999 352 199.161 352 207.998C352 216.834 344.836 223.998 336 223.998ZM336 159.999H176C167.164 159.999 160 152.835 160 143.999C160 135.161 167.164 127.999 176 127.999H336C344.836 127.999 352 135.161 352 143.999C352 152.835 344.836 159.999 336 159.999Z"
        className="fa-secondary"
        fill="var(--secondary)"
        fillOpacity="var(--secondary-opacity)"
      />
      <path
        d="M303.156 399.61C289.062 410.595 272.531 416.079 256 416.079S222.938 410.595 208.844 399.61L0 237.152V464C0 490.51 21.492 512 48 512H464C490.508 512 512 490.51 512 464V237.152L303.156 399.61ZM495.922 209.141C508.865 198.938 509.809 178.997 498.311 167.186C496.859 165.694 495.297 164.296 493.625 163.003C481.438 153.386 470.195 144.649 448 128.142V246.422L495.711 209.307C495.781 209.252 495.852 209.198 495.922 209.141ZM256.441 0C256.293 0 256.145 0.002 256 0.004C255.852 0.002 255.707 0 255.559 0C237.117 0 212.594 18.326 194.895 32.004H317.105C299.406 18.326 274.883 0 256.441 0ZM16.289 209.307L64 246.422V128.142C41.805 144.649 30.562 153.386 18.375 163.003C16.703 164.296 15.141 165.694 13.689 167.186C2.191 178.997 3.135 198.938 16.078 209.141C16.148 209.198 16.219 209.252 16.289 209.307ZM176 223.998H336C344.836 223.998 352 216.834 352 207.998C352 199.161 344.836 191.999 336 191.999H176C167.164 191.999 160 199.161 160 207.998C160 216.834 167.164 223.998 176 223.998ZM176 159.999H336C344.836 159.999 352 152.835 352 143.999C352 135.161 344.836 127.999 336 127.999H176C167.164 127.999 160 135.161 160 143.999C160 152.835 167.164 159.999 176 159.999Z"
        className="fa-primary"
        fill="var(--primary)"
        fillOpacity="var(--primary-opacity)"
      />
    </symbol>
    <symbol id="eye" viewBox="0 0 576 512">
      <path
        d="M572.531 238.973C518.281 115.525 410.938 32 288 32S57.688 115.58 3.469 238.973C1.562 243.402 0 251.041 0 256C0 260.977 1.562 268.596 3.469 273.025C57.719 396.473 165.062 480 288 480S518.312 396.418 572.531 273.025C574.438 268.596 576 260.957 576 256C576 251.023 574.438 243.402 572.531 238.973ZM432 256.062C432 335.516 367.531 400 288.062 400H288C208.5 400 144 335.484 144 256S208.5 112 288 112S432 176.516 432 256V256.062Z"
        className="fa-secondary"
        fill="var(--secondary)"
        fillOpacity="var(--secondary-opacity)"
      />
      <path
        d="M288 160H287.781C285.48 160.029 282.426 160.441 279.539 160.764C284.77 170.037 288 180.594 288 192C288 227.346 259.346 256 224 256C212.551 256 201.959 252.748 192.66 247.482C192.363 250.479 192 253.625 192 256C192 308.996 235.004 352 288 352S384 308.996 384 256S340.996 160 288 160Z"
        className="fa-primary"
        fill="var(--primary)"
        fillOpacity="var(--primary-opacity)"
      />
    </symbol>
    <symbol id="eye-slash" viewBox="0 0 640 512">
      <path
        d="M149.057 91.539C198.68 53.85 257.287 32.004 320 32.004C442.938 32.004 550.281 115.529 604.531 238.975C606.438 243.405 608 251.026 608 256.002C608 260.959 606.438 268.598 604.531 273.028C585.115 317.213 558.791 356.166 527.471 388.132L446.041 324.31C457.127 303.914 464 280.899 464 256.065V256.002C464 176.519 399.5 112.004 320 112.004C282.705 112.004 249.035 126.57 223.453 149.851L149.057 91.539ZM320 160.003H319.781C317.48 160.033 314.426 160.445 311.539 160.767C316.77 170.04 320 180.597 320 192.003C320 202.169 317.414 211.651 313.195 220.188L407.885 294.404C413.043 282.629 416 269.676 416 256.002C416 203.007 372.996 160.003 320 160.003ZM320 352.001C273.043 352.001 234.082 318.189 225.779 273.629L325.113 351.486C323.385 351.578 321.752 352.001 320 352.001ZM373.568 389.464L448.076 447.862C408.771 468.508 365.463 480 320 480C197.062 480 89.719 396.474 35.469 273.028C33.562 268.598 32 260.979 32 256.002C32 251.043 33.562 243.405 35.469 238.975C48.014 210.425 63.516 184.126 81.287 160.38L178 236.182C177.09 242.721 176 249.213 176 256.002C176 335.486 240.5 400.001 320 400.001H320.062C339.006 400.001 356.998 396.122 373.568 389.464Z"
        className="fa-secondary"
        fill="var(--secondary)"
        fillOpacity="var(--secondary-opacity)"
      />
      <path
        d="M615.984 512C610.796 512 605.593 510.344 601.187 506.875L9.187 42.879C-1.235 34.723 -3.063 19.63 5.109 9.192C13.296 -1.214 28.343 -3.089 38.812 5.13L630.812 469.125C641.234 477.282 643.062 492.375 634.89 502.813C630.156 508.844 623.109 512 615.984 512Z"
        className="fa-primary"
        fill="var(--primary)"
        fillOpacity="var(--primary-opacity)"
      />
    </symbol>
    <symbol id="key" viewBox="0 0 512 512">
      <path
        d="M165.406 218.594L9.375 374.625C3.371 380.629 0 388.766 0 397.254V496C0 504.836 7.164 512 16 512H112C120.836 512 128 504.836 128 496V448H176C184.836 448 192 440.836 192 432V384H249.375C253.617 384 257.688 382.312 260.688 379.312L293.406 346.594L165.406 218.594Z"
        className="fa-secondary"
        fill="var(--secondary)"
        fillOpacity="var(--secondary-opacity)"
      />
      <path
        d="M336 0C238.797 0 160 78.797 160 176C160 190.715 162.004 204.93 165.406 218.594L293.406 346.594C307.07 349.992 321.281 352 336 352C433.203 352 512 273.203 512 176S433.203 0 336 0ZM376 176C353.906 176 336 158.094 336 136S353.906 96 376 96S416 113.906 416 136S398.094 176 376 176Z"
        className="fa-primary"
        fill="var(--primary)"
        fillOpacity="var(--primary-opacity)"
      />
    </symbol>
    <symbol id="mailbox" viewBox="0 0 576 512">
      <path
        d="M432 64.001H144C144.307 64.216 144.592 64.602 144.895 64.845C223.893 65.438 288 128.864 288 208V415.999C288 433.671 273.674 447.999 256 447.999H544C561.625 447.999 576 433.624 576 415.999V208C576 128.501 511.5 64.001 432 64.001ZM512 272C512 280.836 504.838 288 496 288H464C455.164 288 448 280.836 448 272V224H400C391.201 224 384 216.801 384 208C384 199.199 391.201 192 400 192H496C504.838 192 512 199.164 512 208V272Z"
        className="fa-secondary"
        fill="var(--secondary)"
        fillOpacity="var(--secondary-opacity)"
      />
      <path
        d="M496 192H400C391.201 192 384 199.199 384 208C384 216.801 391.201 224 400 224H448V272C448 280.836 455.164 288 464 288H496C504.838 288 512 280.836 512 272V208C512 199.164 504.838 192 496 192ZM129.801 64.68C54.945 71.86 0 139.04 0 214.238V415.999C0 433.601 14.4 447.999 32 447.999H256C273.674 447.999 288 433.671 288 415.999V208C288 123.813 215.676 56.454 129.801 64.68ZM208 224H80C71.164 224 64 216.836 64 208C64 199.164 71.164 192 80 192H208C216.838 192 224 199.164 224 208C224 216.836 216.838 224 208 224Z"
        className="fa-primary"
        fill="var(--primary)"
        fillOpacity="var(--primary-opacity)"
      />
    </symbol>
    {/* <symbol id="power-off" viewBox="0 0 512 512">
            <path d="M256 288H256C273.673 288 288 273.673 288 256V32C288 14.327 273.673 0 256 0H256C238.327 0 224 14.327 224 32V256C224 273.673 238.327 288 256 288Z" className="fa-secondary" fill="var(--secondary)" fillOpacity="var(--secondary-opacity)"></path><path d="M401.796 65.328C386.397 53.545 363.884 58.824 354.563 75.824L346.755 90.064C339.216 103.814 342.968 120.76 355.262 130.494C393.257 160.57 415.999 206.625 415.999 256C415.999 358.168 319.723 438.289 213.135 410.396C165.19 397.85 125.106 361.961 107.274 315.721C80.35 245.891 103.565 172.719 156.542 130.646C168.897 120.834 172.811 103.869 165.225 90.033L157.448 75.848C148.104 58.807 125.538 53.582 110.11 65.4C37.612 120.937 0.8 214.742 21.915 309.322C44.667 411.238 134.917 488.242 239.094 495.416C379.053 505.055 495.999 393.936 495.999 256C495.999 180.592 460.639 110.359 401.796 65.328Z" className="fa-primary" fill="var(--primary)" fillOpacity="var(--primary-opacity)"></path>
        </symbol> */}
    <symbol id="user" viewBox="0 0 448 512">
      <path
        d="M352 128C352 198.691 294.695 256 224 256C153.312 256 96 198.691 96 128S153.312 0 224 0C294.695 0 352 57.309 352 128Z"
        className="fa-secondary"
        fill="var(--secondary)"
        fillOpacity="var(--secondary-opacity)"
      />
      <path
        d="M274.664 304.001H173.336C77.609 304.001 0 381.602 0 477.333C0 496.477 15.523 512.001 34.664 512.001H413.336C432.477 512.001 448 496.477 448 477.333C448 381.602 370.398 304.001 274.664 304.001Z"
        className="fa-primary"
        fill="var(--primary)"
        fillOpacity="var(--primary-opacity)"
      />
    </symbol>
    <symbol id="user-check" viewBox="0 0 640 512">
      <path
        d="M274.664 304H173.336C77.609 304 0 381.602 0 477.332C0 496.477 15.523 512 34.664 512H413.336C432.477 512 448 496.477 448 477.332C448 381.602 370.398 304 274.664 304ZM224 256C294.695 256 352 198.691 352 128S294.695 0 224 0C153.312 0 96 57.309 96 128S153.312 256 224 256Z"
        className="fa-secondary"
        fill="var(--secondary)"
        fillOpacity="var(--secondary-opacity)"
      />
      <path
        d="M632.328 134.406C622.625 125.406 607.422 125.953 598.406 135.672L511.359 229.422L472.969 191.031C463.594 181.656 448.406 181.656 439.031 191.031S429.656 215.594 439.031 224.969L495.031 280.969C499.531 285.469 505.641 288 512 288H512.438C518.969 287.875 525.156 285.109 529.594 280.328L633.594 168.328C642.609 158.625 642.047 143.438 632.328 134.406Z"
        className="fa-primary"
        fill="var(--primary)"
        fillOpacity="var(--primary-opacity)"
      />
    </symbol>
    {/* <symbol id="user-group" viewBox="0 0 640 512">
            <path d="M479.588 320H405.74C450.771 357.695 479.59 414.148 479.59 477.332C479.59 490.07 475.814 501.867 469.592 512H607.592C625.26 512 639.59 497.672 639.59 480C639.59 391.633 567.957 320 479.588 320ZM431.59 256C493.449 256 543.59 205.855 543.59 144S493.449 32 431.59 32C406.482 32 383.549 40.555 364.871 54.512C376.428 76.625 383.59 101.371 383.59 128C383.59 163.523 371.658 196.137 352 222.711C372.303 243.242 400.439 256 431.59 256Z" className="fa-secondary" fill="var(--secondary)" fillOpacity="var(--secondary-opacity)"></path><path d="M224 256C294.695 256 352 198.691 352 128S294.695 0 224 0C153.312 0 96 57.309 96 128S153.312 256 224 256ZM274.664 304H173.336C77.609 304 0 381.602 0 477.332C0 496.477 15.523 512 34.664 512H413.336C432.477 512 448 496.477 448 477.332C448 381.602 370.398 304 274.664 304Z" className="fa-primary" fill="var(--primary)" fillOpacity="var(--primary-opacity)"></path>
        </symbol> */}
  </svg>
);