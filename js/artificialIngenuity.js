 
  let backgroundColors = ['linear-gradient(0deg, #F0F5FF 95%, rgba(215, 219, 235, .5) 0)',
    'linear-gradient(0deg, #F1FFF0 95%, rgba(220, 235, 215, .5) 0)', 
    'linear-gradient(0deg, #FEFFF0 95%, rgba(226, 227, 201, .5) 0)', 
    'linear-gradient(0deg, #FFF0F0 95%, rgba(235, 215, 215, .5) 0)'];
  let borders = ['1px solid rgba(213, 214, 234, .9)',
    '1px solid rgba(219, 234, 213, .9)', 
    '1px solid rgba(243, 244, 223, .9)',
    '1px solid rgba(234, 213, 213, .9)'];
  const PAGE = {
    data: {
      backgroundColors: backgroundColors,//卡片背景色
      borders: borders,//背景边框
      scripWidth: 320,//卡片宽度
      scripHeight: 160,//卡片高度
      scripPadding: 20,//卡片移动距离边缘的距离
      maxWidth: 0,
      maxHeight: 0,
      scripTop: 0,//卡片距离顶部的距离
      scripLeft: 0,//卡片距离左部的距离
      zIndex: 0,//卡片层级
      scrip: null,//当前点击/移动的卡片元素
      pageX: 0,//鼠标点击X轴位置
      pageY: 0,//鼠标点击Y轴位置
      isLock: true//锁
    },
    init: function() {
      this.bind();
    },
    bind: function() {
      $('#wishes-btn').on('click',this.wishesBtnAddTo);
      $('#wishes-wall').on('mousedown','.whshes-scrip',this.handleMouseDown);
      $('#wishes-wall').on('click','.scrip-close',this.removeScrip);
      $(window).on('mousemove',this.handleMouseMove);
      $(window).on('mouseup',this.handleMouseUp);
    },
    removeScrip:function(e){
       $(this).parent().remove();
      //  PAGE.data.isLock = true;
    },
    handleMouseMove:function(e){
      if(!PAGE.data.isLock){
        let maxHeight = PAGE.data.maxHeight;
        let maxWidth = PAGE.data.maxWidth;
        let scripPadding = PAGE.data.scripPadding;
        let translateX = e.pageX - PAGE.data.pageX + PAGE.data.scripLeft;
        let translateY = e.pageY - PAGE.data.pageY + PAGE.data.scripTop;
        translateX = translateX > maxWidth ? maxWidth : translateX;
        translateY = translateY > maxHeight ? maxHeight : translateY;
        translateX = translateX < scripPadding ? scripPadding :translateX;
        translateY = translateY < scripPadding ? scripPadding : translateY;
        PAGE.data.scrip.style.left = translateX + 'px';
        PAGE.data.scrip.style.top = translateY + 'px';
      }
    },
    handleMouseDown:function(e){
      e.preventDefault();
      let whshesscrip = e.target;
      $(whshesscrip).addClass('show').siblings().removeClass('show');
      let isLock = e.target.className.indexOf('scrip-close') !== -1;
      if (isLock) {
        return
      }
      whshesscrip.style.zIndex = ++ PAGE.data.zIndex;
      PAGE.data.scrip = whshesscrip;
      PAGE.data.scripTop = whshesscrip.offsetTop;
      PAGE.data.scripLeft = whshesscrip.offsetLeft;
      PAGE.data.pageX = e.pageX;
      PAGE.data.pageY = e.pageY;
      PAGE.data.isLock = false;
    },
    handleMouseUp:function(){
      PAGE.data.isLock = true;
    },
    wishesBtnAddTo:function(){
      PAGE.addCart();
    },
    addCart:function(){
      let value = $("#wishes-search").val();
      let wishesWall = $('#wishes-wall');

      let containerWidth = wishesWall.width();      
      let containerHeight = wishesWall.height();

      let scripWidth = PAGE.data.scripWidth;
      let scripHeight = PAGE.data.scripHeight;
      let scripadding = PAGE.data.scripPadding;

      let maxWidth = containerWidth - scripWidth - scripadding;
      let maxHeight = containerHeight - scripHeight - scripadding;

      let randomTop = PAGE.randomTopFormula(scripadding,maxHeight);
      let randomLeft = PAGE.randomTopFormula(scripadding,maxWidth);
      
      let zIndex = ++PAGE.data.zIndex;
      let backgroundColors = PAGE.data.backgroundColors;
      let backgroundColor = backgroundColors[zIndex%backgroundColors.length]
      let borders = PAGE.data.borders;
      let border = borders[zIndex%borders.length];
      let whshesScrip = `
        <div class="whshes-scrip" style="top:${randomTop}px;left:${randomLeft}px; z-index:${zIndex};background:${backgroundColor};background-size: 100% 21px; border:${border};">
          <div class="scrip-close"></div>${value}
        </div>
        `;
      wishesWall.append(whshesScrip);
      $('#wishes-search').val('');
      PAGE.data.maxWidth = maxWidth;
      PAGE.data.maxHeight = maxHeight;
    },
    randomTopFormula:function(min,max){
      return  Math.floor(Math.random() * (max - min) + min);
    }
  }
  PAGE.init();