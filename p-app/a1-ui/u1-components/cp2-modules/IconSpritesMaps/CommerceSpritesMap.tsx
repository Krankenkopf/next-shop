// Shopping UI 
export const CommerceSpritesMap = () => {
    return <svg id="commerce-icons" xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <defs></defs>
        <symbol id="bag-shopping" viewBox="0 0 448 512">
            <path d="M448 192V432C448 476.182 412.184 512 368 512H80C35.816 512 0 476.182 0 432V192C0 174.326 14.326 160 32 160H104V224C104 237.25 114.75 248 128 248S152 237.25 152 224V160H296V224C296 237.25 306.75 248 320 248S344 237.25 344 224V160H416C433.674 160 448 174.326 448 192Z" className="fa-secondary" fill="var(--secondary)" fillOpacity="var(--secondary-opacity)"></path><path d="M320 248C306.75 248 296 237.25 296 224V120C296 80.312 263.703 48 224 48S152 80.312 152 120V224C152 237.25 141.25 248 128 248S104 237.25 104 224V120C104 53.844 157.828 0 224 0S344 53.844 344 120V224C344 237.25 333.25 248 320 248Z" className="fa-primary" fill="var(--primary)" fillOpacity="var(--primary-opacity)"></path>
        </symbol>
        <symbol id="bags-shopping" viewBox="0 0 576 512">
            <path d="M448 192C448 174.4 433.6 160 416 160H320V99.605C320 53.18 288.627 10.602 243.037 1.834C181.695 -9.965 128 36.773 128 96V160H32C14.4 160 0 174.4 0 192V448C0 465.6 14.4 480 32 480H160V272C160 245.6 181.6 224 208 224H448V192ZM272 160H176V96C176 69.5 197.5 48 224 48S272 69.5 272 96V160ZM464 320C455.164 320 448 327.162 448 335.998V351.992C448 370.113 440.375 387.234 426.875 399.355C413.5 411.604 395.625 417.477 377.625 415.727C344.375 412.479 320 382.609 320 349.117V336C320 327.164 312.838 320 304 320C295.164 320 288 327.164 288 336V348.619C288 397.482 323 440.971 371.375 447.221C398.75 450.719 426.375 442.346 447.25 424.1C468 405.98 480 379.611 480 351.992V335.998C480 327.162 472.838 320 464 320Z" className="fa-secondary" fill="var(--secondary)" fillOpacity="var(--secondary-opacity)"></path><path d="M544 256H224C206.375 256 192 270.375 192 288V480C192 497.625 206.375 512 224 512H544C561.625 512 576 497.625 576 480V288C576 270.375 561.625 256 544 256ZM480 351.992C480 379.611 468 405.98 447.25 424.1C426.375 442.346 398.75 450.719 371.375 447.221C323 440.971 288 397.482 288 348.619V336C288 327.164 295.164 320 304 320C312.838 320 320 327.164 320 336V349.117C320 382.609 344.375 412.479 377.625 415.727C395.625 417.477 413.5 411.604 426.875 399.355C440.375 387.234 448 370.113 448 351.992V335.998C448 327.162 455.164 320 464 320C472.838 320 480 327.162 480 335.998V351.992Z" className="fa-primary" fill="var(--primary)" fillOpacity="var(--primary-opacity)"></path>
        </symbol>
        <symbol id="basket-shopping" viewBox="0 0 576 512">
            <path d="M560 192.01H458.41L469.297 212.947C475.406 224.696 470.828 239.196 459.078 245.289C455.531 247.133 451.75 248.008 448.016 248.008C439.344 248.008 430.984 243.289 426.703 235.071L404.311 192.01H171.689L149.297 235.071C145.016 243.289 136.641 248.008 127.984 248.008C124.25 248.008 120.469 247.133 116.922 245.289C105.172 239.196 100.594 224.696 106.703 212.947L117.59 192.01H16C7.164 192.01 0 199.174 0 208.009V240.008C0 248.844 7.164 256.008 16 256.008H39.111L84.863 461.884C91.371 491.167 117.342 512 147.34 512H428.662C458.658 512 484.631 491.167 491.137 461.884L536.889 256.008H560C568.838 256.008 576 248.844 576 240.008V208.009C576 199.174 568.838 192.01 560 192.01ZM192 432.002C192 440.836 184.834 448.002 176 448.002C167.168 448.002 160 440.836 160 432.002V304.006C160 295.173 167.168 288.007 176 288.007C184.834 288.007 192 295.173 192 304.006V432.002ZM304 432.002C304 440.836 296.834 448.002 288 448.002C279.168 448.002 272 440.836 272 432.002V304.006C272 295.173 279.168 288.007 288 288.007C296.834 288.007 304 295.173 304 304.006V432.002ZM416 432.002C416 440.836 408.834 448.002 400 448.002C391.168 448.002 384 440.836 384 432.002V304.006C384 295.173 391.168 288.007 400 288.007C408.834 288.007 416 295.173 416 304.006V432.002Z" className="fa-secondary" fill="var(--secondary)" fillOpacity="var(--secondary-opacity)"></path><path d="M243.083 2.734C231.317 -3.391 216.833 1.203 210.708 12.953L106.708 212.947C100.598 224.696 105.176 239.196 116.926 245.289C120.473 247.133 124.255 248.008 127.989 248.008C136.645 248.008 145.02 243.289 149.301 235.071L253.301 35.077C259.411 23.327 254.833 8.828 243.083 2.734ZM469.301 212.947L365.301 12.953C359.161 1.172 344.723 -3.422 332.926 2.734C321.176 8.828 316.598 23.327 322.708 35.077L426.708 235.071C430.989 243.289 439.348 248.008 448.02 248.008C451.755 248.008 455.536 247.133 459.083 245.289C470.833 239.196 475.411 224.696 469.301 212.947Z" className="fa-primary" fill="var(--primary)" fillOpacity="var(--primary-opacity)"></path>
        </symbol>
        <symbol id="basket-shopping-simple" viewBox="0 0 576 512">
            <path d="M560 192.01H458.41L469.297 212.947C475.406 224.696 470.828 239.196 459.078 245.289C455.531 247.133 451.75 248.008 448.016 248.008C439.344 248.008 430.984 243.289 426.703 235.071L404.311 192.01H171.689L149.297 235.071C145.016 243.289 136.641 248.008 127.984 248.008C124.25 248.008 120.469 247.133 116.922 245.289C105.172 239.196 100.594 224.696 106.703 212.947L117.59 192.01H16C7.164 192.01 0 199.174 0 208.009V240.008C0 248.844 7.164 256.008 16 256.008H39.111L84.863 461.884C91.371 491.167 117.342 512 147.34 512H428.662C458.658 512 484.631 491.167 491.137 461.884L536.889 256.008H560C568.838 256.008 576 248.844 576 240.008V208.009C576 199.174 568.838 192.01 560 192.01Z" className="fa-secondary" fill="var(--secondary)" fillOpacity="var(--secondary-opacity)"></path><path d="M243.083 2.734C231.317 -3.391 216.833 1.203 210.708 12.953L106.708 212.947C100.598 224.696 105.176 239.196 116.926 245.289C120.473 247.133 124.255 248.008 127.989 248.008C136.645 248.008 145.02 243.289 149.301 235.071L253.301 35.077C259.411 23.327 254.833 8.828 243.083 2.734ZM469.301 212.947L365.301 12.953C359.161 1.172 344.723 -3.422 332.926 2.734C321.176 8.828 316.598 23.327 322.708 35.077L426.708 235.071C430.989 243.289 439.348 248.008 448.02 248.008C451.755 248.008 455.536 247.133 459.083 245.289C470.833 239.196 475.411 224.696 469.301 212.947Z" className="fa-primary" fill="var(--primary)" fillOpacity="var(--primary-opacity)"></path>
        </symbol>
        <symbol id="calculator" viewBox="0 0 384 512">
            <path d="M64 208C64 199.199 71.201 192 80 192H112C120.801 192 128 199.199 128 208V240C128 248.801 120.801 256 112 256H80C71.201 256 64 248.801 64 240V208ZM64 304C64 295.199 71.201 288 80 288H112C120.801 288 128 295.199 128 304V336C128 344.801 120.801 352 112 352H80C71.201 352 64 344.801 64 336V304ZM224 432C224 440.801 216.801 448 208 448H80C71.201 448 64 440.801 64 432V400C64 391.199 71.201 384 80 384H208C216.801 384 224 391.199 224 400V432ZM224 336C224 344.801 216.801 352 208 352H176C167.201 352 160 344.801 160 336V304C160 295.199 167.201 288 176 288H208C216.801 288 224 295.199 224 304V336ZM224 240C224 248.801 216.801 256 208 256H176C167.201 256 160 248.801 160 240V208C160 199.199 167.201 192 176 192H208C216.801 192 224 199.199 224 208V240ZM320 432C320 440.801 312.801 448 304 448H272C263.201 448 256 440.801 256 432V400C256 391.199 263.201 384 272 384H304C312.801 384 320 391.199 320 400V432ZM320 336C320 344.801 312.801 352 304 352H272C263.201 352 256 344.801 256 336V304C256 295.199 263.201 288 272 288H304C312.801 288 320 295.199 320 304V336ZM320 240C320 248.801 312.801 256 304 256H272C263.201 256 256 248.801 256 240V208C256 199.199 263.201 192 272 192H304C312.801 192 320 199.199 320 208V240Z" className="fa-secondary" fill="var(--secondary)" fillOpacity="var(--secondary-opacity)"></path><path d="M336 0H48C22.375 0 0 22.375 0 48V464C0 489.625 22.375 512 48 512H336C361.625 512 384 489.625 384 464V48C384 22.375 361.625 0 336 0ZM64 208C64 199.199 71.201 192 80 192H112C120.801 192 128 199.199 128 208V240C128 248.801 120.801 256 112 256H80C71.201 256 64 248.801 64 240V208ZM64 304C64 295.199 71.201 288 80 288H112C120.801 288 128 295.199 128 304V336C128 344.801 120.801 352 112 352H80C71.201 352 64 344.801 64 336V304ZM224 432C224 440.801 216.801 448 208 448H80C71.201 448 64 440.801 64 432V400C64 391.199 71.201 384 80 384H208C216.801 384 224 391.199 224 400V432ZM224 336C224 344.801 216.801 352 208 352H176C167.201 352 160 344.801 160 336V304C160 295.199 167.201 288 176 288H208C216.801 288 224 295.199 224 304V336ZM224 240C224 248.801 216.801 256 208 256H176C167.201 256 160 248.801 160 240V208C160 199.199 167.201 192 176 192H208C216.801 192 224 199.199 224 208V240ZM320 432C320 440.801 312.801 448 304 448H272C263.201 448 256 440.801 256 432V400C256 391.199 263.201 384 272 384H304C312.801 384 320 391.199 320 400V432ZM320 336C320 344.801 312.801 352 304 352H272C263.201 352 256 344.801 256 336V304C256 295.199 263.201 288 272 288H304C312.801 288 320 295.199 320 304V336ZM320 240C320 248.801 312.801 256 304 256H272C263.201 256 256 248.801 256 240V208C256 199.199 263.201 192 272 192H304C312.801 192 320 199.199 320 208V240ZM320 144C320 152.801 312.801 160 304 160H80C71.201 160 64 152.801 64 144V80C64 71.199 71.201 64 80 64H304C312.801 64 320 71.199 320 80V144Z" className="fa-primary" fill="var(--primary)" fillOpacity="var(--primary-opacity)"></path>
        </symbol>
        <symbol id="cart-arrow-down" viewBox="0 0 576 512">
            <path d="M574.791 72.797L519.932 264.781C516.041 278.438 503.4 288 489.166 288H170.76L122 32H312.043V134.062L289.012 111.031C279.637 101.656 264.449 101.656 255.074 111.031S245.699 135.594 255.074 144.969L319.074 208.969C323.762 213.656 329.902 216 336.043 216S348.324 213.656 353.012 208.969L417.012 144.969C426.387 135.594 426.387 120.406 417.012 111.031S392.449 101.656 383.074 111.031L360.043 134.062V32H544.01C554.15 32 563.463 36.641 569.572 44.734C575.666 52.828 577.572 63.047 574.791 72.797Z" className="fa-secondary" fill="var(--secondary)" fillOpacity="var(--secondary-opacity)"></path><path d="M176 416C149.49 416 128 437.49 128 464S149.49 512 176 512S224 490.51 224 464S202.51 416 176 416ZM464 416C437.49 416 416 437.49 416 464S437.49 512 464 512S512 490.51 512 464S490.51 416 464 416ZM488 336H179.859L119.578 19.51C117.422 8.19 107.525 0 96.002 0H24C10.745 0 0 10.745 0 24V24C0 37.255 10.745 48 24 48H76.141L136.424 364.491C138.58 375.811 148.477 384 160 384H488C501.255 384 512 373.255 512 360V360C512 346.745 501.255 336 488 336ZM319.031 208.969C323.719 213.656 329.859 216 336 216S348.281 213.656 352.969 208.969L416.969 144.969C426.344 135.594 426.344 120.406 416.969 111.031S392.406 101.656 383.031 111.031L360 134.062V32H312V134.062L288.969 111.031C279.594 101.656 264.406 101.656 255.031 111.031S245.656 135.594 255.031 144.969L319.031 208.969Z" className="fa-primary" fill="var(--primary)" fillOpacity="var(--primary-opacity)"></path>
        </symbol>
        <symbol id="cart-plus" viewBox="0 0 576 512">
            <path d="M569.572 44.734C563.463 36.641 554.15 32 544.01 32H122L170.76 288H489.166C503.4 288 516.041 278.438 519.932 264.781L574.791 72.797C577.572 63.047 575.666 52.828 569.572 44.734ZM395.475 180.576H356.615V219.428C356.615 230.742 347.357 240 336.045 240H336.041C324.729 240 315.471 230.742 315.471 219.428V180.576H276.611C265.299 180.576 256.043 171.32 256.043 160.006C256.043 148.693 265.299 139.438 276.611 139.438H315.471V100.586C315.471 89.271 324.729 80.016 336.041 80.016H336.045C347.357 80.016 356.615 89.271 356.615 100.586V139.437H395.475C406.787 139.438 416.043 148.693 416.043 160.006C416.043 171.32 406.787 180.576 395.475 180.576Z" className="fa-secondary" fill="var(--secondary)" fillOpacity="var(--secondary-opacity)"></path><path d="M176 416C149.49 416 128 437.49 128 464S149.49 512 176 512S224 490.51 224 464S202.51 416 176 416ZM276.568 180.576H315.428V219.428C315.428 230.742 324.686 240 335.998 240H336.002C347.314 240 356.572 230.742 356.572 219.428V180.576H395.432C406.744 180.576 416 171.32 416 160.006C416 148.693 406.744 139.438 395.432 139.438H356.572V100.586C356.572 89.271 347.314 80.016 336.002 80.016H335.998C324.686 80.016 315.428 89.271 315.428 100.586V139.437H276.568C265.256 139.438 256 148.693 256 160.006C256 171.32 265.256 180.576 276.568 180.576ZM488 336H179.859L119.578 19.511C117.422 8.191 107.524 0 96 0H24C10.745 0 0 10.745 0 24V24C0 37.255 10.745 48 24 48H76.141L136.424 364.491C138.58 375.811 148.477 384 160 384H488C501.255 384 512 373.255 512 360V360C512 346.745 501.255 336 488 336ZM464 416C437.49 416 416 437.49 416 464S437.49 512 464 512S512 490.51 512 464S490.51 416 464 416Z" className="fa-primary" fill="var(--primary)" fillOpacity="var(--primary-opacity)"></path>
        </symbol>
        <symbol id="cart-shopping" viewBox="0 0 576 512">
            <path d="M569.572 44.734C563.463 36.641 554.15 32 544.01 32H122L170.76 288H489.166C503.4 288 516.041 278.437 519.932 264.781L574.791 72.797C577.572 63.047 575.666 52.828 569.572 44.734Z" className="fa-secondary" fill="var(--secondary)" fillOpacity="var(--secondary-opacity)"></path><path d="M464 416C437.49 416 416 437.49 416 464S437.49 512 464 512S512 490.51 512 464S490.51 416 464 416ZM176 416C149.49 416 128 437.49 128 464S149.49 512 176 512S224 490.51 224 464S202.51 416 176 416ZM488 336H179.859L119.578 19.51C117.422 8.19 107.525 0 96.002 0H24C10.745 0 0 10.745 0 24V24C0 37.255 10.745 48 24 48H76.141L136.424 364.491C138.58 375.811 148.477 384 160 384H488C501.255 384 512 373.255 512 360V360C512 346.745 501.255 336 488 336Z" className="fa-primary" fill="var(--primary)" fillOpacity="var(--primary-opacity)"></path>
        </symbol>
        <symbol id="cart-shopping-fast" viewBox="0 0 640 512">
            <path d="M633.529 44.734C627.42 36.641 618.107 32 607.967 32H185.957L234.717 288H553.123C567.357 288 579.998 278.438 583.889 264.781L638.748 72.797C641.529 63.047 639.623 52.828 633.529 44.734ZM24 144H104C117.256 144 128 133.254 128 120C128 106.744 117.256 96 104 96H24C10.746 96 0 106.744 0 120C0 133.254 10.746 144 24 144ZM24 224H120C133.256 224 144 213.254 144 200C144 186.744 133.256 176 120 176H24C10.746 176 0 186.744 0 200C0 213.254 10.746 224 24 224ZM136 256H24C10.746 256 0 266.744 0 280C0 293.254 10.746 304 24 304H136C149.256 304 160 293.254 160 280C160 266.744 149.256 256 136 256Z" className="fa-secondary" fill="var(--secondary)" fillOpacity="var(--secondary-opacity)"></path><path d="M528 416C501.49 416 480 437.49 480 464S501.49 512 528 512S576 490.51 576 464S554.51 416 528 416ZM240 416C213.49 416 192 437.49 192 464S213.49 512 240 512S288 490.51 288 464S266.51 416 240 416ZM552 336H243.859L183.578 19.51C181.422 8.19 171.525 0 160.002 0H88C74.745 0 64 10.745 64 24V24C64 37.255 74.745 48 88 48H140.141L200.424 364.491C202.58 375.811 212.477 384 224 384H552C565.255 384 576 373.255 576 360V360C576 346.745 565.255 336 552 336Z" className="fa-primary" fill="var(--primary)" fillOpacity="var(--primary-opacity)"></path>
        </symbol>
        <symbol id="credit-card" viewBox="0 0 576 512">
            <path d="M512 32H64C28.652 32 0 60.656 0 96V128H576V96C576 60.656 547.348 32 512 32ZM0 416C0 451.344 28.652 480 64 480H512C547.348 480 576 451.344 576 416V224H0V416ZM192 360C192 355.578 195.582 352 200 352H344C348.418 352 352 355.578 352 360V376C352 380.418 348.418 384 344 384H200C195.582 384 192 380.418 192 376V360ZM64 360C64 355.578 67.582 352 72 352H152C156.418 352 160 355.578 160 360V376C160 380.418 156.418 384 152 384H72C67.582 384 64 380.418 64 376V360Z" className="fa-secondary" fill="var(--secondary)" fillOpacity="var(--secondary-opacity)"></path><path d="M576 224H0V128H576V224Z" className="fa-primary" fill="var(--primary)" fillOpacity="var(--primary-opacity)"></path>
        </symbol>
        <symbol id="percent" viewBox="0 0 384 512">
            <path d="M320.568 321.137C285.508 321.137 257.137 349.508 257.137 384.568S285.508 448 320.568 448S384 419.629 384 384.568S355.629 321.137 320.568 321.137ZM63.432 64C28.371 64 0 92.371 0 127.432S28.371 190.863 63.432 190.863S126.863 162.492 126.863 127.432S98.492 64 63.432 64Z" className="fa-secondary" fill="var(--secondary)" fillOpacity="var(--secondary-opacity)"></path><path d="M372.281 75.719C356.656 60.094 331.344 60.094 315.719 75.719L11.719 379.719C-3.906 395.344 -3.906 420.656 11.719 436.281C19.531 444.094 29.766 448 40 448S60.469 444.094 68.281 436.281L372.281 132.281C387.906 116.656 387.906 91.344 372.281 75.719Z" className="fa-primary" fill="var(--primary)" fillOpacity="var(--primary-opacity)"></path>
        </symbol>
        <symbol id="truck" viewBox="0 0 640 512">
            <path d="M464 352C419.816 352 384 387.816 384 432C384 476.182 419.816 512 464 512S544 476.182 544 432C544 387.816 508.184 352 464 352ZM176 352C131.816 352 96 387.816 96 432C96 476.182 131.816 512 176 512S256 476.182 256 432C256 387.816 220.184 352 176 352Z" className="fa-secondary" fill="var(--secondary)" fillOpacity="var(--secondary-opacity)"></path><path d="M624 416C632.812 416 640 408.797 640 400V368C640 359.203 632.812 352 624 352H608V237.25C608 220.156 601.344 204.094 589.25 192L512 114.75C500.094 102.828 483.594 96 466.75 96H416V48C416 21.5 394.5 0 368 0H48C21.5 0 0 21.5 0 48V368C0 394.5 21.5 416 48 416H66.158C74.027 361.926 119.777 320 176 320C232.279 320 278.535 361.861 286.383 416H353.617C361.465 361.861 407.721 320 464 320C520.223 320 565.973 361.926 573.842 416H624ZM416 256V160H466.75L544 237.25V256H416Z" className="fa-primary" fill="var(--primary)" fillOpacity="var(--primary-opacity)"></path>
        </symbol>
    </svg>
}