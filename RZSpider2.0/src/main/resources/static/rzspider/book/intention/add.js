$("#form-intention-add").validate({
	rules : {
		bookName : {
			required : true,
			maxlength : 30
		},
		bookIsbn : {
			digits : true,
			maxlength : 13,
			minlength : 10
		},
		bookOriginalPrice : {
			number : true,
			maxlength : 8,
		},
		bookPages : {
			digits : true,
			maxlength : 5,
		},

	},
	messages : {
		"bookName" : {
			maxlength : '最长30字'
		},
		"bookIsbn" : {
			digits : "必须是数字",
			maxlength : "最大13位数字",
			minlength : "最小10位数字"
		},
		"bookOriginalPrice" : {
			number : "必须是数字",
			maxlength : "最大8位数字",
		},
		"bookPages" : {
			digits : "必须是数字",
			maxlength : "最大5位数字",
		},
	},
	submitHandler : function(form) {
		add();
	}
});

// 绑定监听事件
$(function() {
	$('#bookClassification').bind('change', function() {
		var bookClassification = $(this).val();
		if (bookClassification == "none") {
			$("#bookClassification2").show();
		} else {
			$("#bookClassification2").hide();
		}
	});
	$('#bookBinding').bind('change', function() {
		var bookBinding = $(this).val();
		if (bookBinding == "none") {
			$("#bookBinding2").show();
		} else {
			$("#bookBinding2").hide();
		}
	});
});

function add() {
	var bookName = $("input[name='bookName']").val();
	var bookAuthor = $("input[name='bookAuthor']").val();
	var bookPublisher = $("input[name='bookPublisher']").val();
	var bookIsbn = $("input[name='bookIsbn']").val();
	var bookDes = $("input[name='bookDes']").val();
	var bookOriginalPrice = $("input[name='bookOriginalPrice']").val();
	var bookClassification = $("#bookClassification").val();
	if (bookClassification == "none") {
		bookClassification = $("#bookClassification2").val();
	}
	var bookBinding = $("#bookBinding").val();
	if (bookBinding == "none") {
		bookBinding = $("#bookBinding2").val();
	}
	var bookPages = $("input[name='bookPages']").val();
	var bookReadStar = $("input[name='bookReadStar']").val();
	var remark = $("input[name='remark']").val();
	$.ajax({
		cache : true,
		type : "POST",
		url : ctx + "book/intention/save",
		data : {
			"bookName" : bookName,
			"bookAuthor" : bookAuthor,
			"bookPublisher" : bookPublisher,
			"bookIsbn" : bookIsbn,
			"bookDes" : bookDes,
			"bookOriginalPrice" : bookOriginalPrice,
			"bookClassification" : bookClassification,
			"bookBinding" : bookBinding,
			"bookPages" : bookPages,
			"bookReadStar" : bookReadStar,
			"remark" : remark,
		},
		async : false,
		error : function(request) {
			$.modalAlert("系统错误", modal_status.FAIL);
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("新增成功,正在刷新数据请稍后……", {
					icon : 1,
					time : 500,
					shade : [ 0.1, '#fff' ]
				}, function() {
					$.parentReload();
				});
			} else {
				$.modalAlert(data.msg, modal_status.FAIL);
			}

		}
	});
}