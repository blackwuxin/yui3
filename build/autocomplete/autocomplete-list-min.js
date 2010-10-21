YUI.add("autocomplete-list",function(B){var H=B.Lang,U=B.Node,K=B.Array,O=9,R="_CLASS_ITEM",S="_CLASS_ITEM_ACTIVE",D="_CLASS_ITEM_HOVER",T="_SELECTOR_ITEM",F="activeItem",J="alwaysShowList",N="circular",Q="hoveredItem",L="id",E="item",C="list",V="result",I="results",P="visible",G="width",M="select",A=B.Base.create("autocompleteList",B.Widget,[B.AutoCompleteBase,B.WidgetPosition,B.WidgetPositionAlign,B.WidgetStack],{ARIA_TEMPLATE:"<div/>",ITEM_TEMPLATE:"<li/>",LIST_TEMPLATE:"<ul/>",initializer:function(){var W=this.get("inputNode");if(!W){B.error("No inputNode specified.");}this._inputNode=W;this._listEvents=[];this.DEF_PARENT_NODE=W.get("parentNode");this[R]=this.getClassName(E);this[S]=this.getClassName(E,"active");this[D]=this.getClassName(E,"hover");this[T]="."+this[R];if(!this.get("align.node")){this.set("align.node",W);}if(!this.get(G)){this.set(G,W.get("offsetWidth"));}this.publish(M,{defaultFn:this._defSelectFn});},destructor:function(){while(this._listEvents.length){this._listEvents.pop().detach();}},bindUI:function(){this._bindInput();this._bindList();},renderUI:function(){var a=this._createAriaNode(),X=this.get("contentBox"),Z=this._inputNode,Y=this.get("listNode"),W=Z.get("parentNode");if(!Y){Y=this._createListNode();X.append(Y);}Z.addClass(this.getClassName("input")).setAttrs({"aria-autocomplete":C,"aria-expanded":false,"aria-owns":Y.get("id"),role:"combobox"});W.append(a);this._ariaNode=a;this._boundingBox=this.get("boundingBox");this._contentBox=X;this._listNode=Y;this._parentNode=W;},syncUI:function(){this._syncResults();this._syncVisibility();},hide:function(){return this.get(J)?this:this.set(P,false);},selectItem:function(W){if(W){if(!W.hasClass(this[R])){return this;}}else{W=this.get(F);if(!W){return this;}}this.fire(M,{itemNode:W,result:W.getData(V)});return this;},_activateNextItem:function(){var X=this.get(F),W;if(X){W=X.next(this[T])||(this.get(N)?null:X);}else{W=this._getFirstItemNode();}this.set(F,W);return this;},_activatePrevItem:function(){var X=this.get(F),W=X?X.previous(this[T]):this.get(N)&&this._getLastItemNode();this.set(F,W||null);return this;},_add:function(W){var X=[];K.each(H.isArray(W)?W:[W],function(Y){X.push(this._createItemNode(Y).setData(V,Y));},this);X=B.all(X);this._listNode.append(X.toFrag());return X;},_ariaSay:function(Y,W){var X=this.get("strings."+Y);this._ariaNode.setContent(W?H.sub(X,W):X);},_bindInput:function(){this._listEvents.push(this._inputNode.on("blur",this._onInputBlur,this));},_bindList:function(){this._listEvents.concat([this.after("mouseover",this._afterMouseOver),this.after("mouseout",this._afterMouseOut),this.after("activeItemChange",this._afterActiveItemChange),this.after("alwaysShowListChange",this._afterAlwaysShowListChange),this.after("hoveredItemChange",this._afterHoveredItemChange),this.after("resultsChange",this._afterResultsChange),this.after("visibleChange",this._afterVisibleChange),this._listNode.delegate("click",this._onItemClick,this[T],this)]);},_clear:function(){this.set(F,null);this._set(Q,null);this._listNode.get("children").remove(true);},_createAriaNode:function(){var W=U.create(this.ARIA_TEMPLATE);return W.addClass(this.getClassName("aria")).setAttrs({"aria-live":"polite",role:"status"});},_createItemNode:function(W){var X=U.create(this.ITEM_TEMPLATE);return X.addClass(this[R]).setAttrs({id:B.stamp(X),role:"option"}).setAttribute("data-text",W.text).append(W.display);},_createListNode:function(){var W=U.create(this.LIST_TEMPLATE);return W.addClass(this.getClassName(C)).setAttrs({id:B.stamp(W),role:"listbox"});},_getFirstItemNode:function(){return this._listNode.one(this[T]);},_getLastItemNode:function(){return this._listNode.one(this[T]+":last-child");},_syncResults:function(X){var W;if(!X){X=this.get(I);}this._clear();if(X.length){W=this._add(X);this._ariaSay("ITEMS_AVAILABLE");}if(this.get("activateFirstItem")&&!this.get(F)){this.set(F,this._getFirstItemNode());}},_syncVisibility:function(W){if(this.get(J)){W=true;this.set(P,W);}if(typeof W==="undefined"){W=this.get(P);}this._inputNode.set("aria-expanded",W);this._boundingBox.set("aria-hidden",!W);if(!W){this.set(F,null);this._set(Q,null);}},_afterActiveItemChange:function(Y){var X=this._inputNode,W=Y.newVal,Z=Y.prevVal;if(Z){Z.removeClass(this[S]);}if(W){W.addClass(this[S]).scrollIntoView();X.set("aria-activedescendant",W.get(L));}else{X.scrollIntoView();}},_afterAlwaysShowListChange:function(W){this.set(P,W.newVal||this.get(I).length>0);},_afterHoveredItemChange:function(X){var W=X.newVal,Y=X.prevVal;if(Y){Y.removeClass(this[D]);}if(W){W.addClass(this[D]);}},_afterMouseOver:function(W){var X=W.domEvent.target.ancestor(this[T],true);this._mouseOverList=true;if(X){this._set(Q,X);}},_afterMouseOut:function(){this._mouseOverList=false;this._set(Q,null);},_afterResultsChange:function(W){this._syncResults(W.newVal);if(!this.get(J)){this.set(P,!!W.newVal.length);}},_afterVisibleChange:function(W){this._syncVisibility(!!W.newVal);},_onInputBlur:function(W){if(!this._mouseOverList||this._lastInputKey===O){this.hide();}},_onItemClick:function(W){var X=W.currentTarget;W.preventDefault();this.set(F,X);this.selectItem(X);},_defSelectFn:function(W){var X=W.result.text;this._inputNode.focus();this._updateValue(X);this._ariaSay("ITEM_SELECTED",{item:X});this.hide();}},{ATTRS:{activateFirstItem:{value:false},activeItem:{setter:B.one,value:null},align:{value:{points:["tl","bl"]}},alwaysShowList:{value:false},circular:{value:true},hoveredItem:{readOnly:true,value:null},strings:{value:{ITEM_SELECTED:"{item} selected.",ITEMS_AVAILABLE:"Suggestions are available. Use the up and down arrow keys to select suggestions."}},tabSelect:{value:true},visible:{value:false}},CSS_PREFIX:B.ClassNameManager.getClassName("aclist"),HTML_PARSER:{listNode:function(){return this.getClassName(C);}}});B.AutoCompleteList=A;B.AutoComplete=A;},"@VERSION@",{skinnable:true,requires:["autocomplete-base","widget","widget-position","widget-position-align","widget-stack"]});