/**
 * yangEditor V0.1.0
 * upload:仅支持文本编辑 2019-05-27
 * fixed:增加图片上传  2019-05-28
 */
(function ($) {

    // 编辑器
    let editor = function (obj , options) {
        this.$element = obj;

        // 默认配置
        this.defaultOptions = {

            // 菜单显示
            // 字体大小 ， 段落/标题 ， 字体颜色 ， 粗体
            // 斜体 ， 下划线 ， 删除线 ， 背景颜色
            // 左对齐 ， 居中对齐 ， 右对齐
            // 有序序列 ， 无序序列
            // 取消撤销 ， 撤销 ， 插入图片 , 创建超链接
            menus:['fontSize' , 'formatBlock' , 'foreColor' , 'bold' ,
                'italic' , 'underline' , 'strikeThrough' , 'backColor' ,
                'justifyLeft' , 'justifyCenter' , 'justifyRight' ,
                'insertOrderedList' , 'insertUnorderedList' ,
                'redo' , 'undo' , 'insertImage' , 'createLink'],

            // 图片上传类型
            // url链接和本地图片
            imgUploadMode:'local',   // url | local

            // 是否是base64
            isBase64:true,

            fileName:'file',
            fileUrl:'',



            // 字体颜色
            fontColors:['#000' , '#eeece0' , '#1c487f' , '#4d80bf' ,
                        '#c24f4a' , '#8baa4a' , '#7b5ba1' , '#46acc8' ,
                        '#f9963b' ,'#ffffff'],

            // 背景颜色
            bgColors:['#000' , '#eeece0' , '#1c487f' , '#4d80bf' ,
                '#c24f4a' , '#8baa4a' , '#7b5ba1' , '#46acc8' ,
                '#f9963b' ,'#ffffff'],


        };

        this.options=$.extend({},this.defaultOptions,options);
    };

    // 菜单
    let menus = {

        // 字体大小
        fontSize:function (ele) {
            return  '<div class="editor-tool">\n' +
                '            <button class="editor-btn"\n' +
                '                    id="fontSize"\n' +
                '                    data-toggle="dropdown">\n' +
                '                <i class="iconfont icon-font-size" ></i>\n' +
                '            </button>\n' +
                '\n' +
                '            <ul class="dropdown-menu">'+
                '                <li class="edit-btn">\n' +
                '                    <button class="editor-btn"\n' +
                '                            data-type="fontSize"\n' +
                '                            data-value="1">文字 10px</button>\n' +
                '                </li>\n' +
                '                <li class="edit-btn">\n' +
                '                    <button class="editor-btn"\n' +
                '                            data-type="fontSize"\n' +
                '                            data-value="2">文字 13px</button>\n' +
                '                </li>\n' +
                '                <li class="edit-btn">\n' +
                '                    <button  class="editor-btn"\n' +
                '                             data-type="fontSize"\n' +
                '                             data-value="3">文字 16px</button></li>\n' +
                '                <li class="edit-btn">\n' +
                '                    <button class="editor-btn"\n' +
                '                            data-type="fontSize"\n' +
                '                            data-value="4">文字 18px</button></li>\n' +
                '                <li class="edit-btn">\n' +
                '                    <button class="editor-btn"\n' +
                '                            data-type="fontSize"\n' +
                '                            data-value="5">文字 24px</button></li>\n' +
                '                <li class="edit-btn">\n' +
                '                    <button class="editor-btn"\n' +
                '                            data-type="fontSize"\n' +
                '                            data-value="6">文字 32px</button></li>\n' +
                '                <li class="edit-btn">\n' +
                '                    <button class="editor-btn"\n' +
                '                            data-type="fontSize"\n' +
                '                            data-value="7">文字 48px</button></li>\n' +
                '            </ul>\n' +
                '        </div>'
        },

        // 段落/标题
        formatBlock:function (ele) {
            return '<div class="editor-tool" style="width: 10%;">\n' +
                '            <button type="button"\n' +
                '                    class="editor-btn"\n' +
                '                    id="formatBlock"\n' +
                '                    data-toggle="dropdown">\n' +
                '                段落/标题\n' +
                '                <span class="caret"></span>\n' +
                '            </button>\n' +
                '            <ul class="dropdown-menu"\n' +
                '                role="menu"\n' +
                '                aria-labelledby="formatBlock">\n' +
                '                <li class="edit-btn">\n' +
                '                    <button class="editor-btn"\n' +
                '                            data-type="formatBlock"\n' +
                '                            data-value="p">段落</button>\n' +
                '                </li>\n' +
                '                <li class="edit-btn">\n' +
                '                    <button class="editor-btn"\n' +
                '                            data-type="formatBlock"\n' +
                '                            data-value="h1">一级标题</button></li>\n' +
                '                <li class="edit-btn">\n' +
                '                    <button class="editor-btn"\n' +
                '                            data-type="formatBlock"\n' +
                '                            data-value="h2">二级标题</button>\n' +
                '                </li>\n' +
                '                <li class="edit-btn">\n' +
                '                    <button class="editor-btn"\n' +
                '                            data-type="formatBlock"\n' +
                '                            data-value="h3" >三级标题</button>\n' +
                '                </li>\n' +
                '                <li class="edit-btn">\n' +
                '                    <button class="editor-btn"\n' +
                '                            data-type="formatBlock"\n' +
                '                            data-value="h4">四级标题</button>\n' +
                '                </li>\n' +
                '                <li class="edit-btn">\n' +
                '                    <button class="editor-btn"\n' +
                '                            data-type="formatBlock"\n' +
                '                            data-value="h5">五级标题</button>\n' +
                '                </li>\n' +
                '                <li class="edit-btn">\n' +
                '                    <button class="editor-btn"\n' +
                '                            data-type="formatBlock"\n' +
                '                            data-value="h6">六级标题</button>\n' +
                '                </li>\n' +
                '            </ul>\n' +
                '        </div>'
        },

        // 字体颜色
        foreColor:function (ele) {
            let fontColor = ele.options.fontColors?ele.options.fontColors:ele.defaultOptions.fontColors;

            let fontColorHtml = '';
            for(let i = 0;i<fontColor.length;i++){
                fontColorHtml += '<li class="edit-btn">\n' +
                    '                  <button class="editor-btn"\n' +
                    '                          data-type="foreColor"\n' +
                    '                          data-value="'+fontColor[i]+'">\n' +
                    '                       <i class="iconfont icon-font-colors"  style=\'color:'+fontColor[i]+'\'></i>\n' +
                    '                  </button>\n' +
                    '             </li>\n'
            }

            return '<div class="editor-tool">\n' +
                '            <button class="editor-btn"\n' +
                '                    id="fontColors"\n' +
                '                    data-toggle="dropdown">\n' +
                '                <i class="iconfont icon-font-colors"></i>\n' +
                '            </button>\n' +
                '            <ul class="dropdown-menu bg clearfix"\n' +
                '                role="menu"\n' +
                '                aria-labelledby="fontColors">\n' +
                fontColorHtml +
                '            </ul>\n' +
                '\n' +
                '\n' +
                '        </div>'
        },

        // 粗体
        bold:function (ele) {
            return '<div class="editor-tool">\n' +
                '            <button class="editor-btn" title="粗体" data-type="bold">\n' +
                '                <i class="iconfont icon-bold"></i>\n' +
                '            </button>\n' +
                '        </div>'
        },

        // 斜体
        italic:function (ele) {
            return '<div class="editor-tool">\n' +
                '            <button class="editor-btn" title="斜体" data-type="italic">\n' +
                '                <i class="iconfont icon-italic"></i>\n' +
                '            </button>\n' +
                '        </div>'
        },

        // 下划线
        underline:function (ele) {
            return '<div class="editor-tool">\n' +
                '            <button class="editor-btn" title="下划线" data-type="underline">\n' +
                '                <i class="iconfont icon-underline"></i>\n' +
                '            </button>\n' +
                '        </div>'
        },

        // 删除线
        strikeThrough:function (ele) {
            return '<div class="editor-tool">\n' +
                '            <button class="editor-btn" title="删除线" data-type="strikeThrough">\n' +
                '                <i class="iconfont icon-strikethrough"></i>\n' +
                '            </button>\n' +
                '        </div>'
        },

        // 背景颜色
        backColor:function (ele) {
            let bgColors = ele.options.bgColors?ele.options.bgColors:ele.defaultOptions.bgColors;

            let bgColorHtml = '';
            for(let i = 0;i<bgColors.length;i++){
                bgColorHtml += '<li class="edit-btn">\n' +
                    '                  <button class="editor-btn"\n' +
                    '                          data-type="backColor"\n' +
                    '                          data-value="'+bgColors[i]+'">\n' +
                    '                       <i class="iconfont icon-bg-colors"  style=\'color:'+bgColors[i]+'\'></i>\n' +
                    '                  </button>\n' +
                    '             </li>\n'
            }

            return '<div class="editor-tool">\n' +
                '            <button class="editor-btn"\n' +
                '                    id="bgColors"\n' +
                '                    data-toggle="dropdown">\n' +
                '                <i class="iconfont icon-bg-colors"></i>\n' +
                '            </button>\n' +
                '            <ul class="dropdown-menu bg clearfix"\n' +
                '                role="menu"\n' +
                '                aria-labelledby="fontColors">\n' + bgColorHtml +
                '            </ul>\n' +
                '        </div>'
        },

        // 左对齐
        justifyLeft:function (ele) {
            return '<div class="editor-tool">\n' +
                '            <button class="editor-btn" title="左对齐" data-type="justifyLeft">\n' +
                '                <i class="iconfont icon-align-left"></i>\n' +
                '            </button>\n' +
                '        </div>'
        },

        // 居中对齐
        justifyCenter:function (ele) {
            return '<div class="editor-tool">\n' +
                '            <button class="editor-btn" title="居中对齐" data-type="justifyCenter">\n' +
                '                <i class="iconfont icon-align-center"></i>\n' +
                '            </button>\n' +
                '        </div>'
        },

        // 右对齐
        justifyRight:function (ele) {
            return '<div class="editor-tool">\n' +
                '            <button class="editor-btn" title="右对齐" data-type="justifyRight">\n' +
                '                <i class="iconfont icon-align-right"></i>\n' +
                '            </button>\n' +
                '        </div>'
        },

        // 有序序列
        insertOrderedList:function (ele) {
            return '<div class="editor-tool">\n' +
                '            <button class="editor-btn" title="有序序列" data-type="insertOrderedList">\n' +
                '                <i class="iconfont icon-orderedlist"></i>\n' +
                '            </button>\n' +
                '        </div>'
        },

        // 无序序列
        insertUnorderedList:function (ele) {
            return '<div class="editor-tool">\n' +
                '            <button class="editor-btn" title="无序序列"  data-type="insertUnorderedList">\n' +
                '                <i class="iconfont icon-unorderedlist"></i>\n' +
                '            </button>\n' +
                '        </div>'
        },

        // 重做被撤销
        redo:function (ele) {
            return '<div class="editor-tool">\n' +
                '            <button class="editor-btn" title="重做被撤销" data-type="redo">\n' +
                '                <i class="iconfont icon-redo"></i>\n' +
                '            </button>\n' +
                '        </div>'
        },

        // 撤销
        undo:function (ele) {
            return '<div class="editor-tool">\n' +
                '            <button class="editor-btn" title="撤销" data-type="undo">\n' +
                '                <i class="iconfont icon-undo"></i>\n' +
                '            </button>\n' +
                '        </div>'
        },

        // 创建超链接
        // createLink:function () {
        //     return '<div class="editor-tool">\n' +
        //         '            <button class="editor-btn" data-type="createLink" title="创建超链接">\n' +
        //         '                <i class="iconfont icon-link"></i>\n' +
        //         '            </button>\n' +
        //         '   </div>'
        // },

        // 插入图片
        insertImage:function () {
            return '<div class="editor-tool">\n' +
                '            <button class="editor-btn" data-type="insertImage" title="插入图片">\n' +
                '                <i class="iconfont icon-picture"></i>\n' +
                '            </button>\n' +
                '            <input type="file" style="display: none" />'+
                '   </div>'
        },
    };

    // 获取光标位置
    let range;

    // 定义editor的方法
    editor.prototype = {
        saveRange:function(){
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);

            console.log(range);
        },

        // 初始化编辑器
        initEditor:function(){

           // 添加对应的css样式
           this.$element.addClass('editor-container');

           // 创建菜单
           this.createMenu();

           // 添加输入框
           this.$element.append('<div class="editor-content" contenteditable="true"></div>')

           // 添加点击事件
           this.bindEvent();

            let selection = getSelection();
            let range = selection.getRangeAt(0);
            console.log(range);
            // range.setSelectionRange(0 , 10)
        },

        // 操作方法
        doCommend:function (key , value) {

            let val = value?value:null;

            document.execCommand(key , false , val)

        },

        // 获取HTML字符串
        getHtml:function () {
            return this.$element.find('.editor-content').html();
        },

        // 将html赋给编辑器
        setHtml:function(html){
            this.$element.find('.editor-content').html(html);
        },

        // 添加菜单
        // addMenu:function () {
        //
        // },

        // 创建菜单
        createMenu:function () {

            let menu = this.options.menus?this.options.menus:this.defaultOptions.menus;
            let _this = this;

            let html = '<div class="editor-tools clearfix">';
            for(let i = 0; i < menu.length;i++){

                for(let key in menus){

                    if(menu[i] === key){
                        let menu_html = eval('menus.'+key+'(_this)');
                        html += menu_html;
                    }
                }

            }
            html += '</div>';

            // 把菜单添加到div上
            this.$element.append(html);
        },

        // 绑定事件
        bindEvent:function () {
            $('.editor-content').focus();

            let _this = this;

            $('.editor-btn').on('click' , function () {
                let type = $(this).data('type');
                let toggle = $(this).data('toggle');
                let value , flag;
                if(!toggle){

                    value = $(this).data('value')?$(this).data('value'):null;

                    let dropMenu = $(this).parents('ul');
                    if(dropMenu.length !== 0){
                        dropMenu.hide();
                    }


                }else{
                    $(this).next().fadeToggle();
                }

                switch(type) {
                    // 添加图片
                    case 'insertImage':
                        let imgUploadMode = _this.options.imgUploadMode ? _this.options.imgUploadMode : 'local';
                        let fileName = _this.options.fileName ? _this.options.fileName : 'file';
                        let fileUrl = _this.options.fileUrl ? _this.options.fileUrl : '';
                        let isBase64;
                        if(_this.options.isBase64 === true){
                            isBase64 = true;
                        }else{
                            isBase64 = false
                        }


                        if(imgUploadMode === 'local'){

                            $(this).next().trigger('click');

                            $(this).next().on('change' , function (e) {

                                let file = e.currentTarget.files[0];

                                if(isBase64 === true){
                                    if(file){
                                        let reader = new FileReader();
                                        reader.readAsDataURL(file);
                                        reader.onload = function(e){
                                            _this.doCommend('insertImage' , e.target.result);
                                        };
                                    }
                                }else{

                                    let xhr = new XMLHttpRequest();
                                    let formdata = new FormData();
                                    formdata.append(fileName, file);

                                    xhr.open('POST', fileUrl, true);
                                    xhr.send(formdata);

                                    xhr.onreadystatechange = () => {
                                        let res = xhr.responseText;
                                        let ret = {};

                                        if(xhr.readyState === 4){
                                            if(xhr.status === 200){
                                                ret.msg = 'The request is successful';
                                                ret.data = JSON.parse(res);

                                                _this.options.uploadImg && _this.options.uploadImg(ret);
                                            } else {
                                                ret.msg = 'The request failed';
                                                ret.statusText = xhr.statusText;
                                                ret.status = xhr.status;

                                                _this.options.uploadImg && _this.options.uploadImg(ret);
                                            }
                                        }
                                    };
                                }

                                $(this).replaceWith('<input type="file" style="display: none"  />')
                            });

                        }else{


                            let input = '<div class="input_wrap">' +
                                            '<input type="text" id="img_url" placeholder="请输入网络图片url链接" />' +
                                        '</div>';

                            // 添加模态框
                            _this.Modal({
                                title:'添加网络图片',
                                content:input,
                                type:'insertImage'
                            });
                        }
                        break;
                    default:
                        flag = document.execCommand(type , false , value)
                        break;
                }
            });
            // $(document).on('keydown' , function (e) {
            //     console.log(e.keyCode);
            //     if(e.keyCode === 9){
            //         _this.doCommend('indent' , null)
            //     }
            // })
        },

        // 设置弹出模态框
        Modal:function (config) {
            let _this = this;
            config.title = config.title || '';
            config.content = config.content || '';
            config.type = config.type || '';

            let html = '<div class="modal-content">\n' +
                '            <div class="mask"></div>\n' +
                '            <div class="mask-wrap">\n' +
                '                <div class="modal">\n' +
                '                    <div class="modal-title">'+config.title+'</div>\n' +
                '                    <div class="modal-body">'+config.content+'</div>\n' +
                '                    <div class="modal-footer clearfix">\n' +
                '                        <button id="confirm">确认</button>\n' +
                '                        <button id="cancel">取消</button>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>';

            this.$element.append(html);

            // 取消
            $('#cancel').on('click',function () {
                _this.$element.children('.modal-content').remove()
            });

            // 确认
            $('#confirm').on('click' , function () {
                $('.editor-content').focus();

                let val = $('#img_url').val()?$('#img_url').val():null;
                _this.doCommend(config.type , val);

                _this.$element.children('.modal-content').remove()
            });

        },
    };



    $.fn.yangEditor=function(options){
        return new editor($(this),options);
    }


})(jQuery);

/**
 * check obj is Object
 * @param obj
 * @returns {boolean}
 */
function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}

/**
 * check arr is Array
 * @param arr
 * @returns {boolean}
 */
function isArray(arr) {
    return Object.prototype.toString().call(arr) === '[object Array]';
}