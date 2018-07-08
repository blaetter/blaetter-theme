/*
* Simple accordion pattern example
* Gerard K. Cohen, 05/20/2017
* 
* accordion Configuration Options 
* data-allow-toggle: Allow for each toggle to both open and close individually 
* data-allow-multiple: Allow for multiple accordion sections to be expanded at the same time (assumes data-allow-toggle otherwise
*      you would not be able to close any of the accordions) 
* Ex: <dl id="accordionGroup" role="presentation" class="accordion" data-allow-multiple data-allow-toggle> 
* 
*/



export default function() { 
    
    // Bde modification: display the "bo-nahverkehr"-include as an accordion
    $('.location-publictransport .bo-nahverkehr').each(function(index) {
        $('.bo-nahverkehr-tsr', this).addClass('accordion');
        $('.bo-nahverkehr-tsr', this).attr('data-allow-multiple','data-allow-multiple');
        $('.bo-nahverkehr-type', this).addClass('accordion-trigger accordion-heading');
        $('.bo-nahverkehr-stops', this).addClass('accordion-panel');
    });
    
    // Bde modification: initial expand all panals set to aria-expanded="true" on the trigger 
    $('.accordion .accordion-trigger').each(function(index) {
        // ensure the element to have all needed attributes
        var myToggler = $('.bo-nahverkehr-type', this); // toggler attributes
        var ariaExpanded = $('aria-expanded', myToggler);
        if(ariaExpanded == null || ariaExpanded == undefined) {
            this.setAttribute('aria-expanded', 'false'); 
        }
        var ariaControls = this.getAttribute('aria-controls');
        if(ariaControls == null || ariaControls == undefined) { // panel attributes
            var panelId = 'js_accordion_index_'+index;
            this.setAttribute('aria-controls', panelId);
            this.nextElementSibling.setAttribute('id', panelId);
            this.nextElementSibling.className += " accordion-panel";
        }
        // set hidden attr
        var isExpanded = this.getAttribute('aria-expanded') == 'true';
        if (!isExpanded) {
            document.getElementById(this.getAttribute('aria-controls')).setAttribute('hidden', 'hidden');
        }
        else {
            document.getElementById(this.getAttribute('aria-controls')).removeAttribute('hidden');
        }
    });
    
    // "Array.from" not supported in IE; So we use "prototype.slice.call"
    //Array.from(document.querySelectorAll('.accordion')).forEach(function (accordion) {
    Array.prototype.slice.call(document.querySelectorAll('.accordion')).forEach(function (accordion) {
      // Allow for multiple accordion sections to be expanded at the same time
      var allowMultiple = accordion.hasAttribute('data-allow-multiple');
      // Allow for each toggle to both open and close individually
      var allowToggle = (allowMultiple) ? allowMultiple : accordion.hasAttribute('data-allow-toggle');

      // Create the array of toggle elements for the accordion group
      var triggers = Array.prototype.slice.call(accordion.querySelectorAll('.accordion-trigger'));
      var panels = Array.prototype.slice.call(accordion.querySelectorAll('.accordion-panel'));
     
      accordion.addEventListener('click', function (event) {
        var target = event.target;
        //console.log('click: '+target.classList);
        if (target.classList.contains('accordion-trigger')) {
          // Check if the current toggle is expanded.
          var isExpanded = target.getAttribute('aria-expanded') == 'true';
          var active = accordion.querySelector('[aria-expanded="true"]');

          // without allowMultiple, close the open accordion
          if (!allowMultiple && active && active !== target) {
            // Set the expanded state on the triggering element
            active.setAttribute('aria-expanded', 'false');
            // Hide the accordion sections, using aria-controls to specify the desired section
            document.getElementById(active.getAttribute('aria-controls')).setAttribute('hidden', '');
          }

          if (!isExpanded) {
            // Set the expanded state on the triggering element
            target.setAttribute('aria-expanded', 'true');
            // Hide the accordion sections, using aria-controls to specify the desired section
            document.getElementById(target.getAttribute('aria-controls')).removeAttribute('hidden');
          }
          else if (allowToggle && isExpanded) {
            // Set the expanded state on the triggering element
            target.setAttribute('aria-expanded', 'false');
            // Hide the accordion sections, using aria-controls to specify the desired section
            document.getElementById(target.getAttribute('aria-controls')).setAttribute('hidden', '');
          }

          event.preventDefault();
        }
      });

      // Bind keyboard behaviors on the main accordion container
      accordion.addEventListener('keydown', function (event) {
        var target = event.target;
        var key = event.which.toString();
        // 33 = Page Up, 34 = Page Down
        var ctrlModifier = (event.ctrlKey && key.match(/33|34/));

        // Is this coming from an accordion header?
        if (target.classList.contains('accordion-trigger')) {
          // Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
          // 38 = Up, 40 = Down
          if (key.match(/38|40/) || ctrlModifier) {
            var index = triggers.indexOf(target);
            var direction = (key.match(/34|40/)) ? 1 : -1;
            var length = triggers.length;
            var newIndex = (index + length + direction) % length;

            triggers[newIndex].focus();

            event.preventDefault();
          }
          else if (key.match(/35|36/)) {
            // 35 = End, 36 = Home keyboard operations
            switch (key) {
              // Go to first accordion
              case '36':
                triggers[0].focus();
                break;
                // Go to last accordion
              case '35':
                triggers[triggers.length - 1].focus();
                break;
            }

            event.preventDefault();
          }
        }
        else if (ctrlModifier) {
          // Control + Page Up/ Page Down keyboard operations
          // Catches events that happen inside of panels
          panels.forEach(function (panel, index) {
            if (panel.contains(target)) {
              triggers[index].focus();

              event.preventDefault();
            }
          });
        }
      });

    });

}
