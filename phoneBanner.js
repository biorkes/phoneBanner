(function () {

    var telScriptEle = document.querySelector('script[data-name="phoneNumberBanner"][data-telnumber]');
    if (typeof telScriptEle !== 'object' || telScriptEle === null || 'dataset' in telScriptEle === false ) {
      throw new Error('Script tag does not exists in the DOM tree. Make sure you have included with attributes data-name="phoneNumberBanner" and data-telnumber="your-tel-number"'); 
    }

    if( telScriptEle.dataset.hasOwnProperty('telnumber') === false){ 
      throw new Error('Attribute [data-tel] was not found provided in the script element. It should contain the phone number.'); 
    }

    if( telScriptEle.dataset.telnumber.length <= 5 ){ 
      throw new Error('Attribute [data-telnumber] should be longer than 5 symbols.'); 
    }

    var options = {
        'wrapper' : {
          'background': telScriptEle.dataset.hasOwnProperty('background') ? telScriptEle.dataset.background : '#414141',
          'padding': telScriptEle.dataset.hasOwnProperty('padding') ? telScriptEle.dataset.padding : '5px',
          'position': telScriptEle.dataset.hasOwnProperty('position') ? telScriptEle.dataset.position : 'fixed',
        },
        'icon' : {
          'animationEnabled' : telScriptEle.dataset.hasOwnProperty('iconwiggle') ? telScriptEle.dataset.iconwiggle : true,
          'width' : telScriptEle.dataset.hasOwnProperty('iconwidth') ? telScriptEle.dataset.iconwidth : '20px',
          'margin' : telScriptEle.dataset.hasOwnProperty('iconmargin') ? telScriptEle.dataset.iconmargin : '0 10px 0 0',
          'src' : telScriptEle.dataset.hasOwnProperty('iconsrc') ? telScriptEle.dataset.iconsrc : "data:image/svg+xml;charset=utf-8,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 25 25' style='enable-background:new 0 0 25 25;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23FFFFFF;%7D .st1%7Bfill:%2343B149;%7D%0A%3C/style%3E%3Crect x='4.3' y='5.2' class='st0' width='16.1' height='15.4'/%3E%3Cg%3E%3Cpath class='st1' d='M15.8,19c0.6,0,1.1-0.1,1.5-0.3c0.6-0.3,1-0.7,1.5-1.2c0.3-0.3,0.3-0.6,0-0.9c-0.7-0.7-1.4-1.4-2.2-2.2 c-0.3-0.3-0.6-0.3-0.9,0c-0.4,0.4-0.8,0.8-1.2,1.2c-0.5,0.5-1,0.5-1.6,0.1c-1.4-1-2.6-2.2-3.6-3.6c-0.4-0.6-0.4-1.1,0.1-1.7 c0.4-0.4,0.8-0.8,1.2-1.2C11,9,11,8.7,10.7,8.4C9.9,7.7,9.2,6.9,8.5,6.2c-0.3-0.3-0.6-0.3-0.9,0C7.4,6.4,7.1,6.6,6.9,6.9 C6.1,7.7,5.8,8.6,6,9.7c0.1,0.8,0.4,1.5,0.8,2.2c1.5,2.9,3.7,5,6.6,6.4C14.2,18.7,15,19,15.8,19z M0,13.2c0-0.5,0-1,0-1.5 c0-0.1,0-0.2,0-0.3c0.1-0.5,0.1-0.9,0.2-1.4c0.5-2.7,1.8-5,3.9-6.9C5.9,1.6,8,0.6,10.4,0.2c0.5-0.1,0.9-0.1,1.4-0.2 c0.5,0,1,0,1.5,0c0.3,0,0.6,0.1,1,0.1c2.9,0.4,5.4,1.7,7.4,3.9c2.6,2.9,3.7,6.3,3.2,10.2c-0.4,2.9-1.7,5.5-3.9,7.5 c-3.1,2.8-6.7,3.9-10.9,3.1c-2.7-0.5-5-1.8-6.9-3.9c-1.6-1.8-2.6-3.9-3.1-6.3C0.1,14.2,0.1,13.7,0,13.2z'/%3E%3C/g%3E%3C/svg%3E%0A",

        },
        'tel' : {
          'link': telScriptEle.dataset.telnumber,
          'text': telScriptEle.dataset.hasOwnProperty('teltext') ? telScriptEle.dataset.teltext : telScriptEle.dataset.telnumber,
          'color': telScriptEle.dataset.hasOwnProperty('telcolor') ? telScriptEle.dataset.telcolor : '#fff',
          'fontSize': telScriptEle.dataset.hasOwnProperty('telfontsize') ? telScriptEle.dataset.telfontsize : '16px',
          'fontWeight': telScriptEle.dataset.hasOwnProperty('telfontweight') ? telScriptEle.dataset.telfontweight : 600,
        }
    }

    var styles = document.createElement('style');
    styles.innerHTML = "@keyframes shake {10%, 90% {transform: translate3d(-2px, 0, 0);}20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(0px, 0, 0); } 40%, 60% { transform: translate3d(0px, 0, 0); };";

    var wrapper = document.createElement('div');
    wrapper.id = 'phoneNumberBanner_wrapper';
    wrapper.style.backgroundColor = options.wrapper.background;
    wrapper.style.padding = options.wrapper.padding;
    wrapper.style.margin = 0;
    wrapper.style.textAlign = 'center';
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';
    wrapper.style.zIndex = 999999;
    wrapper.style.position = 'fixed';
    wrapper.style.width = '100%';
    wrapper.style.fontFamily = 'sans-serif';

    var href = document.createElement('a');
    href.id = 'phoneNumberBanner_href';
    href.style.fontWeight = options.tel.fontWeight;
    href.style.fontSize = options.tel.fontSize;
    href.style.color = options.tel.color;
    href.href = 'tel:' + options.tel.link;
    href.style.textDecoration = 'none';
    href.style.display = 'flex';
    href.style.justifyContent = 'center';
    href.style.alignItems = 'center';
    href.style.verticalAlign = 'middle';


    var img = document.createElement('img');
    img.id = 'phoneNumberBanner_img';
    img.style.display = 'inline';
    img.style.verticalAlign = 'middle';
    img.style.width = options.icon.width;
    img.style.margin = options.icon.margin;

    img.src = options.icon.src

    if(options.icon.animationEnabled === true){
      img.style.animation = 'shake 1.82s cubic-bezier(.36,.07,.19,.97) both';
      img.style.animationIterationCount = "infinite";
      img.classList.add('shake');
    }


    var span = document.createElement('span');
    span.id = 'phoneNumberBanner_span';
    span.innerText = options.tel.text;
    span.style.lineHeight = 1;

    href.appendChild(img);
    href.appendChild(span);
    wrapper.appendChild(href);

    document.body.prepend(styles);
    document.body.prepend(wrapper);

})();

