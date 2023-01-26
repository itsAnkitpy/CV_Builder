/* global $, alert, console */
$(document).ready(function () {
    'use strict';
    /*
    var x = 0,
        inptSkill = $('#input-skills');
    
    inptSkill.on('keyup',function(e){
        e.stopPropagation();
        if(e.which == 13){
            e.preventDefault();
            
            var curVal = inptSkill.val().trim();
            var found = false;
            for(var i = 0; i<x; i++){
                var str = $('.tag-span').eq(i).text().trim();
                if(str == curVal){
                    found=true;
                }
            }
            if(!found && curVal.length > 1){
                $('.tags').append('<span class="tag-span"><i class="fa fa-times"></i> '+curVal + '<input hidden type="text" value="'+curVal+'" name="skills[]"></span>');
                x++;
            }

            inptSkill.val('');
            
        }
    });
    */
    $('.fa-plus-circle').click(function () {
        var curVal = inptSkill.val().trim();
        var found = false;
        for (var i = 0; i < x; i++) {
            var str = $('.tag-span').eq(i).text().trim();
            if (str == curVal) {
                found = true;
            }
        }
        if (!found && curVal.length > 1) {
            $('.tags').append('<span class="tag-span"><i class="fa fa-times"></i> ' + curVal + '<input hidden type="text" value="' + curVal + '" name="skills[]"></span>');
            x++;
        }

        inptSkill.val('');
    });

    // Remove Tag On Click

    $('.tags').on('click', '.tag-span i', function () {
        $(this).parent('.tag-span').fadeOut(500).remove();
        x--;

    });

    // Add education block

    $('#add-edu').on('click', function () {
        $('.all-edus').append('<div class="add-border"><span></span><h2>New education</h2><span></span></div><div class="new-edu"><div class="delete add-blk btn btn-info" id="add-edu"> <i class="fa fa-trash"></i><span>Delete</span></div><br></br><label>Field of study:</label>                  <input type="text" name="edu[]" class="form-control" placeholder="Ex: Computer Science">          <label>Degree:</label><input type="text" name="edu[]" class="form-control" placeholder="Ex: Bachelor\'s"><label>School:</label><input type="text" name="edu[]" class="form-control" placeholder="Ex: al-albayt university"><div class="form-row"><div class="col">                   <label>From year:</label><input type="month" name="edu[]" class="form-control">              </div><div class="col"><label>To year (optional=present):</label>                                 <input type="month" name="edu[]" class="form-control"></div></div></div>');
    });

    //<div class="add-blk delete btn btn-info" id="add-edu"> <i class="fa fa-trash"></i><span>Delete</span></div><br></br>

    // Add Experience block

    $('#add-exp').on('click', function () {
        $('.all-exps').append('<div class="add-border"><span></span><h2>New Experience</h2><span></span></div><div class="new-exp"><div class="delete add-blk btn btn-info" id="add-edu"> <i class="fa fa-trash"></i><span>Delete</span></div><br></br><label>Title:</label><input type="text" name="exp[]" class="form-control" placeholder="Ex: Web Developer"><label>Company:</label>                      <input type="text" name="exp[]" class="form-control" placeholder="Ex: ProgressSoft">             <div class="form-row"><div class="col"><label>From year:</label>                                 <input type="month" name="exp[]" class="form-control"></div><div class="col">                     <label>To year (optional=present):</label><input type="month" name="exp[]" class="form-control">  </div></div><label>Description (optional):</label><textarea name="exp[]" class="form-control"></textarea></div>');
    });

    // Add skills block

    $('.add-skills').on('click', function () {
        $('.all-skills').append('<div class="add-border"><span></span><h2>New Skill</h2><span></span></div><div class="new-skills"><div class="delete add-blk btn btn-info" id="add-edu"> <button class=" btn btn-danger">Delete</button></div><br></br><label>Skill</label><input name="s_name" type="text" name="skills[]" class="form-control"> <label>Proficiency</label><select name="s_level" id="s_level" class="form-control"><option value="">Choose Your Level</option><option value="Beginner">Beginner</option><option value="Intermediate">Intermediate</option><option value="Advanced">Advanced</option></select></div>');

        
        
    });0

    $('.new-skills').on('click', '.delete', function(e){
        e.preventDefault();
        var s_id = e.currentTarget.id;
        $('div[id='+s_id+']').remove()
        a--;

        if( a=== 0){
           //$('#skill_save').hide();
        }


    });

    // Add socials block

    $('.add-socials').on('click', function () {
        $('.all-socials').append('<div class="add-border"><span></span><h2>New social</h2><span></span></div><div class="new-socials"><div class="add-blk btn btn-info" id="add-edu"> <i class="fa fa-trash"></i><span>Delete</span></div><br></br><label>Social Name</label> <input type="text" name="social" class="form-control">          <label>Social Link</label><input type="text" name="socials[]" class="form-control"> <label>Social icon image (16px*16px)</label><input type="file" name="socials[]" class="form-control" /></div>');

    });

    // Add socials block

    $('.add-hoppies').on('click', function () {
        $('.all-hoppies').append('<div class="add-border"><span></span><h2>New Hoppy</h2><span></span></div><div class="new-hoppies"><div class="add-blk btn btn-info" id="add-edu"> <i class="fa fa-trash"></i><span>Delete</span></div><br></br> <label>Hoppy icon image (32px*32px)</label><input type="file" name="hoppies[]" class="form-control" /></div>');

    });


    $.fn.serializeObject = function(asString){
        var o = {}
        var a = this.serializeArray();
        $.each(a, function(){
            if($('#' + this.name).hasClass('date')){
                this.value = new Date(this.value).setHours(12)
            }
    
                if(o[this.name] !== undefined){
                    if(!o[this.name].push){
                        o[this.name] = [o[this.name]]
                    }
                    o[this.name].push(this.value || '')
                }else{
                    o[this.name] = this.value || '';
                }
    
        });
        if(asString){
            return JSON.stringify(o)
        }
        return o;
    }
    
    
    // Save skills
    $('#skill_save').click(function(e){
        e.preventDefault();
    
        var formData = $('.form_skill').serializeObject()
        var obj;
    
        var nameArray = []
        var levelArray = []
    
        if(Array.isArray(formData.s_name)){
            for(var i=0; i <formData.s_name.length; i++){
                obj = {}
                obj.s_name = formData.s_name[i]
                obj.s_level = formData.s_level[i]
    
                nameArray.push(formData.s_name[i])
                levelArray.push(formData.s_level[i])
                console.log("Object from array" , obj)
                
    
            }

            $.ajax({
                type:'POST',
                url:'{% url "skill-save" %}',
                headers: {'X-CSRFToken': '{{csrf_token}}'},
                data:{'s_name':nameArray, 's_level':levelArray},
 
                success: function(data){
                    x = data.status
                    if(x == 1){
                    alert('Multiple Skill Data Saved')
                    }else{
                    alert('Multiple Skill Data Not Saved')
                    } 
                }
 
            })
    
            
        }else{
            obj = {}
            obj.s_name = formData.s_name
            obj.s_level = formData.s_level
    
            nameArray.push(formData.s_name)
            levelArray.push(formData.s_level)
            
            $.ajax({
                type:'POST',
                url:'{% url "skill-save" %}',
                headers: {'X-CSRFToken': '{{csrf_token}}'},
                data:{'s_name':nameArray, 's_level':levelArray},
 
                success: function(data){
                    x = data.status
                    if(x == 1){
                        alert('Single Skill Data Saved')
                    }else{
                        alert('Single Skill Data Not Saved')
                    }
                }
 
            })
    
        }
    
    });


});


