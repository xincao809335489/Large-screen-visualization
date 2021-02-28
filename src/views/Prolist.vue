<template>
  <div>
    <el-divider></el-divider>
    <el-table
      :row-key="getRowKeys"
      :expand-row-keys="expands"
      @current-change="toggleRowExpansion"
      class="table"
      stripe
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-tag
            :key="tag"
            v-for="(tag, index) in props.row.shopTags"
            closable
            :disable-transitions="false"
            @close="handleClose(props.row, index, tag)"
            :type="changeType(index)"
          >
            {{ tag }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="产品ID" prop="id" width="180"></el-table-column>
      <el-table-column
        label="产品名称"
        prop="name"
        width="130"
      ></el-table-column>
      <el-table-column prop="date" label="生产日期" width="180">
      </el-table-column>
      <el-table-column label="产品描述" prop="desc"></el-table-column>
    </el-table>
    <el-dialog title="新增信息" :visible.sync="dialogAddFormVisible">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        :label-width="formLabelWidth"
      >
        <el-form-item label="产品ID" prop="id">
          <el-input
            v-model="form.id"
            placeholder="请输入产品ID"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入人员名称"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="生产日期" prop="date">
          <el-date-picker
            v-model="form.date"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 100%"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="产品描述" prop="desc">
          <el-input
            v-model="form.desc"
            placeholder="请输入产品描述"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="请选择商品的分类" prop="shopTags">
          <el-checkbox-group
            v-model="checkedClassify"
            @change="handleCheckedShopChange"
          >
            <el-checkbox
              v-for="(tag, index) in form.shopTags"
              :label="tag"
              :key="index"
              >{{ tag }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeAddDialogForm('form')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <div class="footer">
      <kt-button
        size="medium"
        type="primary"
        @click="addShopInfo"
        label="新增"
        perms="add"
      ></kt-button>
    </div>
  </div>
</template>
<script type="text/javascript">
import { products, addShop, deleteShopTag } from '../api/http'
import ktButton from '../components/ktButton.vue'
export default {
  components: { ktButton },
  data () {
    return {
      tableData: [],
      compony: [],
      // 要展开的行，数值的元素是row的key值
      expands: [],
      dialogAddFormVisible: false,
      checkedClassify: ['97年代', '20年代'],
      form: {
        id: '',
        name: '',
        date: '',
        desc: '',
        shopTags: []
      },
      formLabelWidth: '150px',
      rules: {
        id: [
          { required: true, message: '请输入商品id', trigger: 'blur' },
          { pattern: /^\d{8,}$/, message: '至少8 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入人员名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        date: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        desc: [
          { required: true, message: '请输入产品描述', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    // 获取商品数据
    getTableData () {
      products().then((res) => {
        if (res.status === 200) {
          this.tableData = res.data
        } else {
          this.$message.error({
            message: '请求失败'
          })
        }
      })
    },
    handleClose (rows, tagIndex, tag) {
      const dynamicTags = rows.shopTags
      const id = rows.id
      if (dynamicTags.length >= 1) {
        const obj = {
          id,
          tagIndex
        }
        dynamicTags.splice(dynamicTags.indexOf(tag), 1)
        deleteShopTag(obj).then((res) => {
          if (res.status === 200) {
            this.$message.success({
              message: res.message
            })
          }
        })
      } else {
        this.$message.error({
          message: '只有一个tag不允许删除'
        })
      }
    },
    changeType (idx) {
      const colotArr = ['success', 'warning', 'danger']
      return colotArr[idx]
    },
    addShopInfo () {
      this.dialogAddFormVisible = true
      const addForm = {
        id: '',
        name: '',
        date: '',
        desc: '',
        shopTags: ['97年代', '20年代', '22年代']
      }
      this.form = Object.assign({}, addForm)
    },
    changeAddDialogForm (form) {
      const _this = this
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.dialogAddFormVisible = false
          addShop(_this.form).then((res) => {
            console.log(res)
            if (res.status === 200) {
              this.$message.success({
                message: res.message
              })
              this.getTableData()
            }
          })
        } else {
          return false
        }
      })
    },
    // 获取row的key值
    getRowKeys (row) {
      return row.id
    },
    // 设置点击行数展开唯一个行
    toggleRowExpansion (row) {
      this.expands = []
      this.expands.push(row.id)
    },
    // 商品分类选择
    handleCheckedShopChange (value) {
      console.log(value)
    }
  }
}
</script>
<style lang="less" scoped>
.el-divider--horizontal {
  margin: 2px 0;
}
.tabler {
  padding: 10px 15px;
}
.el-tag,
.el-table,
.el-button {
  font-size: 16px;
}
.el-tag + .el-tag {
  margin-left: 15px;
}
.footer {
  margin: 15px;
}
</style>
