<template>
  <div class="Complaint-opinion">
    <div class="one-box">
      <div class="feedback-type">
        <div class="title">Tipo de retroalimentación</div>
        <div class="feedback-content">
          <div
            class="content-list"
            v-for="(item, index) in feedbackList"
            :key="index"
            @click="handleFeedbackFn(index + 1)"
            :class="{ 'active-feedback': feedBackArr.includes(index + 1) }"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="des-problema">
        <div class="title">Por favor describe tu problema</div>
        <van-field
          v-model="problemValue"
          type="textarea"
          row="4"
          maxlength="1000"
          minlength="10"
          placeholder="Por favor ingresa......."
          show-word-limit
          :autosize="{ maxHeight: 100, minHeight: 100 }"
        />
      </div>
      <!-- 上传图片 -->
      <div class="subir-fotos">
        <div class="title">Subir fotos</div>
        <div class="upload-pic">
          <van-uploader
            :after-read="afterRead"
            v-model="fileList"
            :max-count="3"
            :before-delete="deleteFn"
            accept="image/*"
            :before-read="beforeRead"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "VVComplaint",
  data() {
    return {
      feedbackList: [
        "Solicitar un préstamo",
        "Problema de pago",
        "Problemas posteriores al préstamo",
        "Mal funcionamiento de la APP",
        "Problemas de moderación",
        "Plazo de endeudamiento",
        "Cuota/tasa",
        "Otras preguntas",
        "Opiniones de optimización",
      ],
      feedBackArr: [],
      problemValue: "",
      fileList: [],
      emailValue: "",
      imageList: [],
      emailTip: "",
      docmHeight:
        document.documentElement.clientHeight || document.body.clientHeight,
      showHeight:
        document.documentElement.clientHeight || document.body.clientHeight,
      emailFlag: false,
      uploaderImgTip: "",
      phoneNumbeValue: "",
      phoneTip: "",
      phoneInputShow: false,
    };
  },
  async created() {},
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      this.imageList.push(file);
    },
    beforeRead(file) {
      this.uploaderImgTip = "";
      if (file.size > 3 * 1024 * 1024) {
        this.uploaderImgTip = "El tamaño de la imagen no puede exceder de 3mb";
        return false;
      }
      return true;
    },
    deleteFn(file) {
      this.imageList = this.imageList.filter(
        (item) => item.file.lastModified != file.file.lastModified
      );
      return true;
    },
    handleFeedbackFn(value) {
      if (this.feedBackArr.length < 3 && !this.feedBackArr.includes(value)) {
        this.feedBackArr.push(value);
        return;
      } else if (this.feedBackArr.includes(value)) {
        this.feedBackArr = this.feedBackArr.filter((item) => item != value);
        return;
      } else {
        this.$toast.text("Se pueden seleccionar hasta trestipos!");
      }
    },
  },
};
</script>
<style scoped>
::v-deep .van-popup {
  width: 320px;
  height: 180px;
  background: #ffffff;
  border-radius: 15px;
  padding: 20px;
}
p {
  height: 75px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 16px;
  color: #333333;
  line-height: 25px;
  text-align: center;
  font-style: normal;
}
button {
  width: 280px;
  height: 45px;
  background: #099f51;
  border-radius: 6px;
  font-family: Roboto, Roboto;
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  line-height: 19px;
  text-align: center;
  font-style: normal;
  margin-top: 20px;
}
.Complaint-opinion {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 16px 0;
  width: 100%;
  height: 100vh;
}
.one-box {
  flex: 1;
  overflow: scroll;
  background-color: #fff;
  padding-right: 16px;
}
.title {
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 16px;
  color: #333333;
  line-height: 22px;
  text-align: left;
  font-style: normal;
  margin-bottom: 10px;
}
.feedback-type {
  margin-bottom: 10px;
}
.feedback-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.content-list {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 102px;
  height: 40px;
  padding: 0 4px;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #adadad;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 8px;
  color: #adadad;
  line-height: 11px;
  text-align: center;
  font-style: normal;
  margin-bottom: 10px;
}
.active-feedback {
  background: #ffffff;
  border: 1px solid #099f51;
  color: #099f51;
}
.des-problema {
  margin-bottom: 20px;
}
::v-deep .van-cell {
  width: 100%;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #adadad;
}

.email-box {
  margin: 20px 0 30px;
}
.tip {
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 12px;
  color: #adadad;
  text-align: left;
  font-style: normal;
}
.email-input {
  width: 328px;
  height: 44px;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #cccccc;
  margin-top: 10px;
  padding-left: 10px;
}

input::placeholder {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 12px;
  color: #999999;
  line-height: 17px;
  text-align: left;
  font-style: normal;
}
.bottom-btn {
  width: 100%;
  height: 65px;
  background-color: #fff;
}
.bottomClass {
  width: 100%;
  height: 45px;
  background: #099f51;
  border-radius: 6px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  line-height: 22px;
  text-align: center;
  font-style: normal;
}
</style>
