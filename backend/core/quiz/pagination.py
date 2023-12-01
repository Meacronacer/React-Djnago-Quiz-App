from rest_framework.pagination import CursorPagination


class QuestionPagination(CursorPagination):
    page_size = 1
    ordering = 'id'