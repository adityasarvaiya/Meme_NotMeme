/*=======================
SMART WIZARD
=========================*/
(function(a) {
    a.fn.smartWizard = function(k) {
        var c = a.extend({}, a.fn.smartWizard.defaults, k),
            u = arguments;
        return this.each(function() {
            function z() {
                var d = b.children("div");
                b.children("ul").addClass("anchor");
                d.addClass("content");
                l = a("<div>Loading</div>").addClass("loader");
                i = a("<div></div>").addClass("actionBar");
                m = a("<div></div>").addClass("stepContainer");
                n = a("<a>" + c.labelNext + "</a>").attr("href", "#").addClass("buttonNext");
                o = a("<a>" + c.labelPrevious + "</a>").attr("href", "#").addClass("buttonPrevious");
                p = a("<a>" + c.labelFinish + "</a>").attr("href", "#").addClass("buttonFinish");
                c.errorSteps && c.errorSteps.length > 0 && a.each(c.errorSteps, function(a, b) {
                    v(b, !0)
                });
                m.append(d);
                i.append(l);
                b.append(m);
                b.append(i);
                i.append(p).append(n).append(o);
                w = m.width();
                a(n).click(function() {
                    x();
                    return !1
                });
                a(o).click(function() {
                    y();
                    return !1
                });
                a(p).click(function() {
                    if (!a(this).hasClass("buttonDisabled"))
                        if (a.isFunction(c.onFinish)) c.onFinish.call(this, a(f));
                        else {
                            var d = b.parents("form");
                            d && d.length && d.submit()
                        }
                    return !1
                });
                a(f).bind("click", function() {
                    if (f.index(this) == h) return !1;
                    var a = f.index(this);
                    f.eq(a).attr("isDone") - 0 == 1 && q(a);
                    return !1
                });
                c.keyNavigation && a(document).keyup(function(a) {
                    a.which == 39 ? x() : a.which == 37 && y()
                });
                A();
                q(h)
            }

            function A() {
                c.enableAllSteps ? (a(f, b).removeClass("selected").removeClass("disabled").addClass("done"), a(f, b).attr("isDone", 1)) : (a(f, b).removeClass("selected").removeClass("done").addClass("disabled"), a(f, b).attr("isDone", 0));
                a(f, b).each(function(d) {
                    a(a(this).attr("href"), b).hide();
                    a(this).attr("rel",
                        d + 1)
                })
            }

            function q(d) {
                var e = f.eq(d),
                    g = c.contentURL,
                    h = e.data("hasContent");
                stepNum = d + 1;
                g && g.length > 0 ? c.contentCache && h ? t(d) : a.ajax({
                    url: g,
                    type: "POST",
                    data: {
                        step_number: stepNum
                    },
                    dataType: "text",
                    beforeSend: function() {
                        l.show()
                    },
                    error: function() {
                        l.hide()
                    },
                    success: function(c) {
                        l.hide();
                        c && c.length > 0 && (e.data("hasContent", !0), a(a(e, b).attr("href"), b).html(c), t(d))
                    }
                }) : t(d)
            }

            function t(d) {
                var e = f.eq(d),
                    g = f.eq(h);
                if (d != h && a.isFunction(c.onLeaveStep) && !c.onLeaveStep.call(this, a(g))) return !1;
                m.height(a(a(e, b).attr("href"),
                    b).outerHeight());
                if (c.transitionEffect == "slide") a(a(g, b).attr("href"), b).slideUp("fast", function() {
                    a(a(e, b).attr("href"), b).slideDown("fast");
                    h = d;
                    r(g, e)
                });
                else if (c.transitionEffect == "fade") a(a(g, b).attr("href"), b).fadeOut("fast", function() {
                    a(a(e, b).attr("href"), b).fadeIn("fast");
                    h = d;
                    r(g, e)
                });
                else if (c.transitionEffect == "slideleft") {
                    var i = 0;
                    d > h ? (nextElmLeft1 = w + 10, nextElmLeft2 = 0, i = 0 - a(a(g, b).attr("href"), b).outerWidth()) : (nextElmLeft1 = 0 - a(a(e, b).attr("href"), b).outerWidth() + 20, nextElmLeft2 = 0, i = 10 +
                        a(a(g, b).attr("href"), b).outerWidth());
                    d == h ? (nextElmLeft1 = a(a(e, b).attr("href"), b).outerWidth() + 20, nextElmLeft2 = 0, i = 0 - a(a(g, b).attr("href"), b).outerWidth()) : a(a(g, b).attr("href"), b).animate({
                        left: i
                    }, "fast", function() {
                        a(a(g, b).attr("href"), b).hide()
                    });
                    a(a(e, b).attr("href"), b).css("left", nextElmLeft1);
                    a(a(e, b).attr("href"), b).show();
                    a(a(e, b).attr("href"), b).animate({
                        left: nextElmLeft2
                    }, "fast", function() {
                        h = d;
                        r(g, e)
                    })
                } else a(a(g, b).attr("href"), b).hide(), a(a(e, b).attr("href"), b).show(), h = d, r(g, e);
                return !0
            }

            function r(d, e) {
                a(d, b).removeClass("selected");
                a(d, b).addClass("done");
                a(e, b).removeClass("disabled");
                a(e, b).removeClass("done");
                a(e, b).addClass("selected");
                a(e, b).attr("isDone", 1);
                c.cycleSteps || (0 >= h ? a(o).addClass("buttonDisabled") : a(o).removeClass("buttonDisabled"), f.length - 1 <= h ? a(n).addClass("buttonDisabled") : a(n).removeClass("buttonDisabled"));
                !f.hasClass("disabled") || c.enableFinishButton ? a(p).removeClass("buttonDisabled") : a(p).addClass("buttonDisabled");
                if (a.isFunction(c.onShowStep) && !c.onShowStep.call(this,
                        a(e))) return !1
            }

            function x() {
                var a = h + 1;
                if (f.length <= a) {
                    if (!c.cycleSteps) return !1;
                    a = 0
                }
                q(a)
            }

            function y() {
                var a = h - 1;
                if (0 > a) {
                    if (!c.cycleSteps) return !1;
                    a = f.length - 1
                }
                q(a)
            }

            function B(b) {
                a(".content", j).html(b);
                j.show()
            }

            function v(d, c) {
                c ? a(f.eq(d - 1), b).addClass("error") : a(f.eq(d - 1), b).removeClass("error")
            }
            var b = a(this),
                h = c.selected,
                f = a("ul > li > a", b),
                w = 0,
                l, j, i, m, n, o, p;
            i = a(".actionBar", b);
            i.length == 0 && (i = a("<div></div>").addClass("actionBar"));
            j = a(".msgBox", b);
            j.length == 0 && (j = a('<div class="msgBox"><div class="content"></div><a href="#" class="close">X</a></div>'),
                i.append(j));
            a(".close", j).click(function() {
                j.fadeOut("normal");
                return !1
            });
            if (!k || k === "init" || typeof k === "object") z();
            else if (k === "showMessage") {
                var s = Array.prototype.slice.call(u, 1);
                B(s[0]);
                return !0
            } else if (k === "setError") return s = Array.prototype.slice.call(u, 1), v(s[0].stepnum, s[0].iserror), !0;
            else a.error("Method " + k + " does not exist")
        })
    };
    a.fn.smartWizard.defaults = {
        selected: 0,
        keyNavigation: !0,
        enableAllSteps: !1,
        transitionEffect: "fade",
        contentURL: null,
        contentCache: !0,
        cycleSteps: !1,
        enableFinishButton: !1,
        errorSteps: [],
        labelNext: "Next",
        labelPrevious: "Previous",
        labelFinish: "Finish",
        onLeaveStep: null,
        onShowStep: null,
        onFinish: null
    }
})(jQuery);