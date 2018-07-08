/*
 * Add a blur effect to articleimage with the wrong ratio
 */
 
export default function() {
	
    // Duplicate and BLUR the backgroundcopy of an image to fill out different image ratios
    // Info: CSS Bluring is very unperformant on mobile devices! Zoom inside a blured gallery can crash the browser.
    // The "transform" property force the user’s browser to hardware accelerate,
    // if you try blurring an element without it applied, you’ll see a general drop in frame rate!
    
    $('div.js-articleimage-add-blur').each(function(){
        var myImage = $('img', this);
        $(myImage).parent().css({'position':'relative','overflow':'hidden'});
        $(myImage).css('position', 'relative');
        $(myImage).clone().prependTo($(myImage).parent()).removeClass().addClass('image-blured').css({
           'position' : 'absolute',
           'width' : '100%',
           'height' : '100%',
           'max-width' : 'none',
           'left': '0',
           'top': '6%',
           'filter' : 'blur(12px)',
           'transform': 'translate3d(0, 0, 0)',
           'transform': 'scale(1.2)'
        });
    });
}
