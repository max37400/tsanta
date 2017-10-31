from django.shortcuts import render, redirect


def index(request):

    context = {}

    return render(request, "index.html", context=context)


def application(request):

    context = {}

    return render(request, "application.html", context=context)


def thanks(request):

    context = {}

    return render(request, "thanks.html", context=context)
