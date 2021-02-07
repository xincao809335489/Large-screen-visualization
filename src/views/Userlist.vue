<template>
  <div>
    <el-divider></el-divider>
    <el-table
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%"
      class="table"
      :cell-style="isCenter"
      :data="
        tableData.filter(
          (data) =>
            !searchName ||
            data.name.toLowerCase().includes(searchName.toLowerCase())
        )
      "
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column label="日期" width="130">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="170"> </el-table-column>
      <el-table-column
        prop="address"
        width="500"
        label="地址"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="100"
        :filters="[
          { text: '家', value: '家' },
          { text: '公司', value: '公司' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '家' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.tag }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column align="right" width="370">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="searchName"
            size="medium"
            placeholder="输入关键字搜索"
          />
          <el-button size="mini" @click="handleAdd(scope)">新增</el-button>
        </template>
        <template slot-scope="scope" align="left">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-button size="medium" type="primary" @click="handleAllDelete"
        >批量删除</el-button
      >
      <el-pagination
        @current-change="changeCurrent"
        background
        layout="prev, pager, next"
        :total="len"
        :hide-on-single-page="true"
      >
      </el-pagination>
    </div>
    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" :label-width="formLabelWidth">
        <el-form-item label="注册日期">
          <el-date-picker
            v-model="form.date"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 100%"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="部门人员名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门人员通讯地址">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-select v-model="form.tag" placeholder="请选择所处区域">
            <el-option label="家" value="家"></el-option>
            <el-option label="公司" value="公司"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeDialogForm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增信息" :visible.sync="dialogAddFormVisible">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        :label-width="formLabelWidth"
      >
        <el-form-item label="注册日期" prop="date">
          <el-date-picker
            v-model="form.date"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 100%"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="部门人员名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入人员名称"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门人员通讯地址" prop="address">
          <el-input
            v-model="form.address"
            placeholder="请输入详细地址"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="tag">
          <el-select v-model="form.tag" placeholder="请选择所处区域">
            <el-option label="家" value="家"></el-option>
            <el-option label="公司" value="公司"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeAddDialogForm('form')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import { userLists, deleteAll, editInfo, deleteInfo, addInfo } from '../api/http'
export default {
  data () {
    return {
      tableData: [],
      len: 0,
      multipleSelection: [],
      searchName: '',
      pageIndex: 0,
      pageSize: 10,
      dialogFormVisible: false,
      dialogAddFormVisible: false,
      form: {
        id: '',
        name: '',
        address: '',
        date: '',
        tag: ''
      },
      formLabelWidth: '150px',
      rules: {
        name: [
          { required: true, message: '请输入人员名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        tag: [{ required: true, message: '请选择所处区域', trigger: 'change' }],
        date: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    // 获取列表数据
    this.getLists()
  },
  methods: {
    // 获取列表数据
    getLists () {
      const params = {
        searchName: this.searchName,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      userLists(params).then((res) => {
        if (res.status === 200) {
          this.tableData = res.lists
          this.len = res.total
        } else {
          this.$message.warning({
            message: '请求失败'
          })
        }
      })
    },
    // 点击分页页数
    changeCurrent (val) {
      this.pageIndex = parseInt(val) - 1
      this.getLists()
    },
    // 批量删除数据
    handleAllDelete () {
      const ids = this.multipleSelection.map((item) => item.id)
      deleteAll(ids).then((res) => {
        if (res.status === 200) {
          this.$message.success({
            message: res.message
          })
          this.getLists()
        } else {
          this.$message.warning({
            message: '删除失败'
          })
        }
      })
    },
    // 复选框全选
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 家与公司的选择
    filterTag (value, row) {
      return row.tag === value
    },
    // 编辑事件
    handleEdit (index, row) {
      this.dialogFormVisible = true
      this.form = Object.assign({}, row)
    },
    // 编辑框，确定事件
    changeDialogForm () {
      this.dialogFormVisible = false
      editInfo(this.form).then((res) => {
        if (res.status === 200) {
          this.$message.success({
            message: res.message
          })
          this.getLists()
        }
      })
    },
    // 单条删除事件
    handleDelete (index, row) {
      deleteInfo(row).then((res) => {
        if (res.status === 200) {
          this.$message.success({
            message: res.message
          })
          this.getLists()
        } else {
          this.$message.warning({
            message: '删除失败'
          })
        }
      })
    },
    // 设置单元格样式
    isCenter ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 6) {
        return 'text-align: center'
      } else {
        return 'text-align: left'
      }
    },
    // 新增事件
    handleAdd ($scope) {
      this.dialogAddFormVisible = true
      const addForm = {
        id: '',
        name: '',
        address: '',
        date: '',
        tag: ''
      }
      this.form = Object.assign({}, addForm)
    },
    // 新增框，确定事件
    changeAddDialogForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.dialogAddFormVisible = false
          addInfo(this.form).then((res) => {
            if (res.status === 200) {
              this.$message.success({
                message: res.message
              })
              this.getLists()
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">
.el-divider--horizontal {
  margin: 2px 0;
}
.table {
  padding-left: 12px;
}
.el-tag,
.el-table,
.el-button {
  font-size: 16px;
}
.el-table__header {
  .is-right {
    .cell {
      display: flex !important;
    }
  }
}
.pagination {
  display: flex;
  justify-content: space-between;
  padding: 12px 18px 0px 18px;
  .el-button--medium {
    font-size: 16px;
  }
}
</style>
