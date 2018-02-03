<template>
	<div>
		<h3>图片上传路由出口</h3>
		<label for="inputArea">
			<div    v-bind:style="{backgroundImage:'url('+headerImage+')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: '100% 100%',width:w,height:h}"  id="image" >13234</div>
		</label>
		<input style="display:none;" ref="abc" name="image" accept="image/*" id="inputArea" type="file" @change="loadImg1"/>
		<canvas id="myCanvas"></canvas>
	</div>
</template>
<script>
export default {
	data () {
		return {
			headerImage: "",
			w: '',
			h: ''
		};
	},
	mounted () {
	},
	methods: {
		loadImg1(){
			var myFrom = new FormData();
			var imgData = this.$refs.abc.files[0];// 图片文件
			// 放在onloadend事件之外
			console.log(this.$refs.abc.value);
			myFrom.append("image", imgData);
			var reader = new FileReader(); // 调用FileReader对象
			console.log(imgData);
			reader.readAsDataURL(imgData); // 通过DataURL的方式返回图像
			reader.onloadend = () => {
				// 用data赋值因为是异步的会取不到值
				this.headerImage = reader.result;
				// console.log(this.headerImage.background);
				this.w = '200px';
				this.h = '300px';
				screenshots();
			};
			function screenshots(){
					// 截图功能
				var canvas = document.getElementById('myCanvas');
				var ctx = canvas.getContext('2d');
				var img = document.getElementById("image");
				img.onload = function(){ // 确认图片已载入
				  canvas.width = 300; // 将img对象的长款赋给canvas标签
    			canvas.height = 300;
					ctx.drawImage(img, 0, 0, 300, 300);
					// var cutData = ctx.getImageData(0, 0, img.width, img.height);
					ctx.putImageData(ctx, 150, 0, 50, 50, 25, 25);
				};
			};
		}
	}
};
</script>
<style lang="stylus" scoped>
// #image{
// 	background-size:cover;
// }
</style>
